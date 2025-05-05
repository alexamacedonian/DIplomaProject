import os
import json
import logging

import paho.mqtt.client as mqtt

from air_quality.models import SensorReading
from air_quality.db import SessionLocal, engine


logger = logging.getLogger('air_quality')

MQTT_BROKER = os.getenv("MQTT_BROKER")
MQTT_PORT = int(os.getenv("MQTT_PORT"))
MQTT_USERNAME = os.getenv("MQTT_USERNAME")
MQTT_PASSWORD = os.getenv("MQTT_PASSWORD")
MQTT_TOPIC = os.getenv("MQTT_TOPIC")


def on_connect(client, userdata, flags, reason_code, properties):
    logger.info(f"Connected with result code {reason_code}")
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    logger.info(f"Message received: topic={msg.topic}, content={msg.payload.decode()}")
    try:
        payload = json.loads(msg.payload)
        reading = SensorReading(
            device_id=payload.get("device_id", "unknown"),
            temperature=payload.get("temperature"),
            humidity=payload.get("humidity"),
            co_ppm=payload.get("co_ppm"),
            timestamp=payload.get("timestamp"),
        )
        db = SessionLocal()
        db.add(reading)
        db.commit()
        db.close()
    except Exception as e:
        print("Failed to process message:", e)


def mqtt_thread():
    mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    mqtt_client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)

    mqtt_client.enable_logger()

    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message

    mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
    mqtt_client.loop_forever()