
int LEDpin = 3;
int analogInPin = A0;
int analogOutPin = 9;

int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)
int sensorValue2 = 0;        // value read from the pot
int outputValue2 = 0;        // value output to the PWM (analog out)

int RandoNum = random(0,1023);

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(LEDpin, OUTPUT);
 }

void loop() {
byte brightness;
if(Serial.available()){
  brightness = Serial.read();
  analogWrite(LEDpin, brightness);
}
  
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  // change the analog out value:
  analogWrite(analogOutPin, outputValue);
    
  // print the results to the Serial Monitor:
  Serial.println(sensorValue);

}
