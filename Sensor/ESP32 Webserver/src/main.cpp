#include "WiFiCredentials.h"
#include "Arduino.h"
#include "WiFi.h"
#include "AsyncTCP.h"
#include "ESPAsyncWebServer.h"
#include "Adafruit_MPU6050.h"
#include "Adafruit_Sensor.h"
#include "Arduino_JSON.h"
#include "SPIFFS.h"

AsyncWebServer server(80);
AsyncEventSource sensorReadings("/SensorReadings"); // access at ws://[esp ip]/SensorReadings

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWD;

Adafruit_MPU6050 sensor;
sensors_event_t a, g, temp;
float gyroX, gyroY, gyroZ;
float accX, accY, accZ;
JSONVar readings;
unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.printf("WiFi Failed!\n");
    return;
  }
  Serial.println(WiFi.localIP());
}

void initSensor() {
  if (!sensor.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");
}

void initSPIFFS() {
  if (!SPIFFS.begin()) {
    Serial.println("An error has occurred while mounting SPIFFS");
  }
  Serial.println("SPIFFS mounted successfully");
}

String getSensorReadings() {
  sensor.getEvent(&a, &g, &temp);

  float accX = a.acceleration.x;
  float accY = a.acceleration.y;
  float accZ = a.acceleration.z;

  float gyroX = g.gyro.x;
  float gyroY = g.gyro.y;
  float gyroZ = g.gyro.z;
  
  readings["accX"] = String(accX);
  readings["accY"] = String(accY);
  readings["accZ"] = String(accZ);
  readings["gyroX"] = String(gyroX);
  readings["gyroY"] = String(gyroY);
  readings["gyroZ"] = String(gyroZ);

  return JSON.stringify (readings);
}

void setup() {
  Serial.begin(115200);
  initWiFi();
  initSPIFFS();
  initSensor();

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });
  server.serveStatic("/", SPIFFS, "/");

  sensorReadings.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected. Last message ID that it got is: %u\n", client->lastId());
    }
    client->send("Hello Client.", NULL, millis(), 10000);
  });

  server.addHandler(&sensorReadings);
  server.begin();
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    sensorReadings.send(getSensorReadings().c_str(),"readings",millis());
    lastTime = millis();
  }
}