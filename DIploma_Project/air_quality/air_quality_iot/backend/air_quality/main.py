import logging
import threading

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from air_quality.api import router
from air_quality.mqtt import mqtt_thread
from air_quality.db import SessionLocal, engine
from air_quality.models import PostgreSQLModelBase

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s:%(module)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S%z",
)

logger = logging.getLogger('air_quality')

PostgreSQLModelBase.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://185.4.180.242:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
def start_mqtt():
    thread = threading.Thread(target=mqtt_thread, daemon=True)
    thread.start()
