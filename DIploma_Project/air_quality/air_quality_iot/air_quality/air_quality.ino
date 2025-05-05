#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <time.h>

const long gmtOffset_sec = 5 * 3600;
const int daylightOffset_sec = 0;

//wifi settings
const char* ssid = "Amina"; // change by your needings
const char* password = "30032018"; // change by your needings

const char* mqtt_server = "185.4.180.242"; //there also u shloud change by your ip, cause u creating a container in docker, everyone who will start from local will have own containers
const int mqtt_port = 1883; //ports also changeable
const char* mqtt_user = "iot_device";
const char* mqtt_pass = "jBkHE6LskuM";
const char* topic = "sensors/data";

#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const int mq7Pin = A0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected. IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("esp8266-client", mqtt_user, mqtt_pass)) {
      Serial.println("connected.");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(60000);
    }
  }
}

String getISO8601Timestamp() {
  time_t now = time(nullptr);
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S%z", timeinfo);

  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S%z", timeinfo);
  return String(buffer);
}

void setup() {
  Serial.begin(9600);

  dht.begin();
  setup_wifi();

  configTime(gmtOffset_sec, daylightOffset_sec, "pool.ntp.org");
  
  Serial.println("Waiting for time sync...");
  while (time(nullptr) < 100000) {
    delay(100);
  }

  Serial.println("Time synced.");
  
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  // Read sensors
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int co_raw = analogRead(mq7Pin);
  float co_ppm = map(co_raw, 0, 1023, 0, 100); // crude mapping
  String timestamp = getISO8601Timestamp();

  // if (isnan(temperature) || isnan(humidity)) {
  //   Serial.println("Failed to read DHT!");
  //   delay(10000);
  //   return;
  // }


  if (isnan(temperature)) {
    temperature = 0;
  }

  if (isnan(humidity)) {
    humidity = 0;
  }

  String payload = "{";
  payload += "\"device_id\": 1,";
  payload += "\"temperature\":" + String(temperature) + ",";
  payload += "\"humidity\":" + String(humidity) + ",";
  payload += "\"co_ppm\":" + String(co_ppm) + ",";
  payload += "\"timestamp\":\"" + timestamp + "\"";
  payload += "}";

  Serial.println("Publishing: " + payload);
  client.publish(topic, payload.c_str());

  delay(60000);
}
