import itertools

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Date, Integer

from air_quality.db import SessionLocal
from air_quality.models import Device, SensorReading, User
from air_quality.schemas import (
    Login as LoginSchema,
    UserCreate as UserCreateSchema,
    TokenResponse as TokenResponseSchema,
    
    Device as DeviceSchema,
    Reading as ReadingSchema,

    ReadingsGroupByOption,
    ReadingGroupByDay,
    ReadingGroupByMonth,
    ReadingGroupByYear,
)
from air_quality.auth import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

auth_scheme = security = HTTPBearer()

def get_current_user(token: str = Depends(auth_scheme)):
    payload = decode_access_token(token.credentials)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return payload.get("sub")


router = APIRouter()


@router.post("/register", response_model=TokenResponseSchema)
def register(
    user: UserCreateSchema,
    db: Session = Depends(get_db)
):
    if db.query(User).\
        filter_by(username=user.username).\
        first():
        raise HTTPException(status_code=400, detail="Username already exists")

    if db.query(User).\
        filter_by(email=user.email).\
        first():
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    token = create_access_token({"sub": new_user.username})

    return TokenResponseSchema(access_token=token)


@router.post("/login", response_model=TokenResponseSchema)
def login(
    user: LoginSchema,
    db: Session = Depends(get_db),
):
    db_user = db.query(User).\
        filter_by(username=user.username).\
        first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.username})

    return TokenResponseSchema(access_token=token)


@router.get("/devices", response_model=list[DeviceSchema])
def get_readings(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    readings = db.query(Device).\
        order_by(Device.id.desc()).\
        offset(offset).\
        limit(limit).\
        all()

    return [DeviceSchema(**r.__dict__) for r in readings]


@router.get(
    "/readings",
    response_model=list[ReadingSchema] | ReadingGroupByDay | ReadingGroupByMonth | ReadingGroupByYear)
def get_readings(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    device_id: int | None = None,
    group_by: ReadingsGroupByOption | None = None,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_user),
):
    if group_by is None:
        readings = db.query(SensorReading)
        
        if device_id is not None:
            readings = readings.filter(SensorReading.device_id == device_id)
        
        readings = readings.order_by(SensorReading.timestamp.desc()).\
            offset(offset).\
            limit(limit).\
            all()

        return [ReadingSchema(**r.__dict__) for r in readings]
    elif group_by is ReadingsGroupByOption.DAY:
        readings = db.query(
            cast(func.date_trunc('day', SensorReading.timestamp), Date),
            SensorReading
        ).\
        order_by(SensorReading.timestamp.desc()).\
        all()

        return ReadingGroupByDay(days={
            k: [ReadingSchema(**r.__dict__) for _, r in v]
            for k, v in itertools.groupby(readings, key=lambda x: x[0])
        })
    elif group_by is ReadingsGroupByOption.MONTH:
        readings = db.query(
            cast(func.date_trunc('month', SensorReading.timestamp), Date),
            SensorReading
        ).\
        order_by(SensorReading.timestamp.desc()).\
        all()

        return ReadingGroupByMonth(months={
            k: [ReadingSchema(**r.__dict__) for _, r in v]
            for k, v in itertools.groupby(readings, key=lambda x: x[0])
        })
    elif group_by is ReadingsGroupByOption.YEAR:
        readings = db.query(
            cast(func.extract('year', SensorReading.timestamp), Integer),
            SensorReading
        ).\
        order_by(SensorReading.timestamp.desc()).\
        all()

        return ReadingGroupByYear(years={
            k: [ReadingSchema(**r.__dict__) for _, r in v]
            for k, v in itertools.groupby(readings, key=lambda x: x[0])
        })

# --- Прогноз уровня CO ---
from air_quality.predict import get_prediction

@router.get("/predict")
def predict():
    return get_prediction()

