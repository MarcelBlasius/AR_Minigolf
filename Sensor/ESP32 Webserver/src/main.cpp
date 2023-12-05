#include "WiFiCredentials.h"
#include "Arduino.h"
#include "WiFi.h"
#include "AsyncTCP.h"
#include "ESPAsyncWebServer.h"
#include "Adafruit_MPU6050.h"
#include "Adafruit_Sensor.h"
#include "Arduino_JSON.h"
#include "SPIFFS.h"
#include "math.h"

#define BUTTON_PIN_SENSOR 19
#define BUTTON_PIN_RESET 18
#define DEBOUNCE_TIME 100
#define MAX_SWING_TIME 10000
#define MIN_ACC 10
#define EARLIST_SWING_FINISH 5000

AsyncWebServer server(4200);
AsyncEventSource sensorReadings("/SensorReadings");
AsyncEventSource reset("/Reset");

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWD;

Adafruit_MPU6050 sensor;
sensors_event_t a, g, temp;
float gyroX, gyroY, gyroZ;
float accX, accY, accZ;
JSONVar readings;

int lastSteadyStateSensor = LOW;       
int lastFlickerableStateSensor = LOW; 
int currentStateSensor;                
unsigned long lastDebounceTimeSensor = 0;

int lastSteadyStateReset = LOW;       
int lastFlickerableStateReset = LOW; 
int currentStateReset;                
unsigned long lastDebounceTimeReset = 0;

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

  float maxAccX = 0;
  float maxAccY = 0;
  float maxAccZ = 0;

  unsigned long starttime = millis();
  unsigned long endtime = starttime;

  while((endtime - starttime) <= MAX_SWING_TIME) {
    sensor.getEvent(&a, &g, &temp);

    if((a.acceleration.x < MIN_ACC && (endtime - starttime) >  EARLIST_SWING_FINISH) || (a.acceleration.y < MIN_ACC && (endtime - starttime) >  EARLIST_SWING_FINISH)) {
      break;
    }

    if(abs(a.acceleration.x) > maxAccX) {
      maxAccX = abs(a.acceleration.x);
    }

    if(abs(a.acceleration.y) > maxAccY) {
      maxAccY = abs(a.acceleration.y);
    }

    if(abs(a.acceleration.z) > maxAccZ) {
      maxAccZ = abs(a.acceleration.z);
    }
    
    endtime = millis();
  }
  
  readings["accX"] = String(maxAccX);
  readings["accY"] = String(maxAccY);
  readings["accZ"] = String(maxAccZ);

  return JSON.stringify (readings);
}

void setup() {
  Serial.begin(115200);
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  pinMode(BUTTON_PIN_SENSOR, INPUT_PULLUP);
  pinMode(BUTTON_PIN_RESET, INPUT_PULLUP);
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

  reset.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected. Last message ID that it got is: %u\n", client->lastId());
    }
    client->send("Hello Client.", NULL, millis(), 10000);
  });

  server.addHandler(&sensorReadings);
  server.addHandler(&reset);
  server.begin();
}

void loop() {

  currentStateSensor  = digitalRead(BUTTON_PIN_SENSOR);
  currentStateReset  = digitalRead(BUTTON_PIN_RESET);

  if (currentStateSensor != lastFlickerableStateSensor) {
    lastDebounceTimeSensor = millis();
    lastFlickerableStateSensor = currentStateSensor;
  }

  if (currentStateReset != lastFlickerableStateReset) {
    lastDebounceTimeReset = millis();
    lastFlickerableStateReset = currentStateReset;
  }

  if ((millis() - lastDebounceTimeSensor) > DEBOUNCE_TIME) {
   
    if(lastSteadyStateSensor == HIGH && currentStateSensor == LOW) {
      sensorReadings.send(getSensorReadings().c_str(),"readings",millis());
    }
    lastSteadyStateSensor = currentStateSensor;
  }

  if ((millis() - lastDebounceTimeReset) > DEBOUNCE_TIME) {
   
    if(lastSteadyStateReset == HIGH && currentStateReset == LOW) {
      reset.send("reset","reset",millis());
    }
    lastSteadyStateReset = currentStateReset;
  }
}