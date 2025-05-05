import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import MappedAsDataclass, DeclarativeBase, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import TIMESTAMP


class PostgreSQLModelBase(DeclarativeBase):
    type_annotation_map = {
        datetime.datetime: TIMESTAMP(timezone=True),
    }


class User(PostgreSQLModelBase):
    __tablename__ = "user"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)


class Device(PostgreSQLModelBase):
    __tablename__ = 'device'

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column()

    __table_args__ = (
        {"schema": "public"},
    )


class SensorReading(PostgreSQLModelBase):
    __tablename__ = 'sensor_reading'

    id: Mapped[int] = mapped_column(primary_key=True)
    device_id: Mapped[int] = mapped_column(ForeignKey('public.device.id'), nullable=False)
    temperature: Mapped[float] = mapped_column(nullable=True)
    humidity: Mapped[float] = mapped_column(nullable=True)
    co_ppm: Mapped[float] = mapped_column(nullable=True)
    timestamp: Mapped[datetime.datetime] = mapped_column(nullable=False)

    __table_args__ = (
        {"schema": "public"},
    )

