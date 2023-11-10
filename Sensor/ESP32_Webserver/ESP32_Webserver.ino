#include "WiFiCredentials.h"
#include "ESPAsyncTCP.h"
#include "ESPAsyncWebServer.h"
#include "Adafruit_MPU6050.h"
#include "Adafruit_Sensor.h"
#include "Arduino_JSON.h"

AsyncWebServer server(80);
AsyncWebSocket ws("/SensorReadings"); // access at ws://[esp ip]/SensorReadings

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWD;

Adafruit_MPU6050 sensor;
sensors_event_t a, g, temp;
float gyroX, gyroY, gyroZ;
float accX, accY, accZ;
JSONVar readings;

void onEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len) {
  switch(type) {
    case WS_EVT_CONNECT: 
      //client connected
      os_printf("ws[%s][%u] connect\n", server->url(), client->id());
      client->printf("Hello Client %u :)", client->id());
      client->ping();
      break;
    case WS_EVT_DISCONNECT:
      //client disconnected
      os_printf("ws[%s][%u] disconnect: %u\n", server->url(), client->id());
      break;
    case WS_EVT_DATA:
      //data package
      ws.textAll(getGyroReadings());
      ws.textAll(getAccReadings());
      break;
    default:
      os_printf("ws[%s][%u] Error\n", server->url(), client->id());
      break;
  }
}

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.printf("WiFi Failed!\n");
    return;
  }
}

void initSensor() {
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");
}

String getGyroReadings() {
  mpu.getEvent(&a, &g, &temp);

  float gyroX = g.gyro.x;
  float gyroY = g.gyro.y;
  float gyroZ = g.gyro.z;

  readings["gyroX"] = String(gyroX);
  readings["gyroY"] = String(gyroY);
  readings["gyroZ"] = String(gyroZ);

  return JSON.stringify(readings);
}

String getAccReadings() {
  mpu.getEvent(&a, &g, &temp);

  float accX = a.acceleration.x;
  float accY = a.acceleration.y;
  float accZ = a.acceleration.z;

  readings["accX"] = String(accX);
  readings["accY"] = String(accY);
  readings["accZ"] = String(accZ);

  return JSON.stringify (readings);
}

void setup() {
  Serial.begin(115200);
  initWiFi();
  initSensor();
  ws.onEvent(onEvent);
  server.addHandler(&ws);
  server.begin();
}
