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
AsyncWebSocket ws("/SensorReadings"); // access at ws://[esp ip]/SensorReadings

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWD;

Adafruit_MPU6050 sensor;
sensors_event_t a, g, temp;
float gyroX, gyroY, gyroZ;
float accX, accY, accZ;
JSONVar readings;

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

  // float accX = 0.5;
  // float accY = 1.5;
  // float accZ = 2.5;

  // float gyroX = 3.5;
  // float gyroY = 4.5;
  // float gyroZ = 5.5;
  
  readings["accX"] = String(accX);
  readings["accY"] = String(accY);
  readings["accZ"] = String(accZ);
  readings["gyroX"] = String(gyroX);
  readings["gyroY"] = String(gyroY);
  readings["gyroZ"] = String(gyroZ);

  return JSON.stringify (readings);
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    if (strcmp((char*)data, "getSensorReadings") == 0) {
      ws.textAll(getSensorReadings());
    }
  }
}


void onEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len) {
  switch(type) {
    case WS_EVT_CONNECT: 
      client->printf("Hello Client %u", client->id());
      client->ping();
      break;
    case WS_EVT_DISCONNECT:   
      client->printf("Bye Client %u", client->id());  
      break;
    case WS_EVT_DATA:
      client->printf("Sensor request received by client %u", client->id());
      handleWebSocketMessage(arg, data, len);
      break;
    default:
      break;
  }
}

void setup() {
  Serial.begin(115200);
  initWiFi();
  initSPIFFS();
  initSensor();
  ws.onEvent(onEvent);
  server.addHandler(&ws);
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });
  server.serveStatic("/", SPIFFS, "/");
  server.begin();
}

void loop() {
  ws.cleanupClients();
}