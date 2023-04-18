
const int ledPin = 3; //LED light being triggered by mouse press
int incomingByte; // a variable to read incoming serial data into

//potentiometer
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 3;  // Analog output pin that the LED is attached to


//potentiometer
int sensorValue = 0;  // value read from the pot
int outputValue = 0;  // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) { // see if there's incoming serial data
    incomingByte = Serial.read(); // read it
    if (incomingByte == 255 ) {    // if it's a capital up arrow
      digitalWrite(ledPin, HIGH); // turn on the LED
    }
    if (incomingByte == 0) {    // if it's an down arrow
      digitalWrite(ledPin, LOW);  // turn off the LED
    }
  }
}
