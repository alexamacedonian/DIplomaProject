import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class ReadingsGroupByOption(str, Enum):
    DAY: str = 'day'
    MONTH: str = 'month'
    YEAR: str = 'year'


class Device(BaseSchema):
	id: int
	description: str


class Reading(BaseSchema):
    id: int
    device_id: int
    temperature: float
    humidity: float
    co_ppm: float
    timestamp: datetime.datetime


class ReadingGroupByDay(BaseSchema):
    days: dict[datetime.date, list[Reading]]


class ReadingGroupByMonth(BaseSchema):
    months: dict[datetime.date, list[Reading]]


class ReadingGroupByYear(BaseSchema):
    years: dict[int, list[Reading]]


class Login(BaseSchema):
    username: str
    password: str


class UserCreate(BaseSchema):
    email: str
    username: str
    password: str


class TokenResponse(BaseSchema):
    access_token: str
