# DIplomaProject
Web-Based Platform for Air Quality Monitoring

go to the folder where there is a .env file (it is somewhere in the
backend), copy the path to this file, go to the docker, in the terminal,
write cd /path to the .env file, docker-compose up --build, if you did it
correctly, then after downloading all the dependencies, all 3 containers
will start (backend, mosquito, postgres)

go to windows cmd, go to the root folder of the front cd/here will be the
path to the folder/Front, the first command is npm install, after it
installs the necessary files, write npm start

and also create in DIploma_Project\air_quality\air_quality_iot a .env file with:
MQTT_USERNAME=backend
MQTT_PASSWORD=9ohUvGnmnHQ
MQTT_BROKER=mosquitto
MQTT_PORT=1883 #change by your selected ports
MQTT_TOPIC=sensors/data

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=air_quality
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

JWT_SECRET_KEY=k2BJCqpaQDOtZrgB
