#include <Arduino.h>

#define LED 4
#define UNOinput 13

void setup() {
  pinMode(UNOinput, INPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (digitalRead(UNOinput)) {
    digitalWrite(LED, HIGH);
  }
  else {
    digitalWrite(LED, LOW);
  }
}