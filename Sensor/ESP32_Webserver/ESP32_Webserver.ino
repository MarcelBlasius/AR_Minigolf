#include "WiFiCredentials.h"
#include "ESPAsyncTCP.h"
#include "ESPAsyncWebServer.h"

AsyncWebServer server(80);

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWD;

void setup() {
  Serial.begin(115200);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.printf("WiFi Failed!\n");
    return;
  }

  server.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

}
