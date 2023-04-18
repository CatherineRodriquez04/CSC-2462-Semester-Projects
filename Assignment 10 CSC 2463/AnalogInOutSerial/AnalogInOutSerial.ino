
/* 
Game Details:
This two person game’s objective is to have one player guess when the other player’s LED light is at a brightness of 80 or above. 
The first player is to screw the potentiometer back and forth to bring the white LED light to difference brightness levels. 
When the brightness reaches 80 or above and the second player presses their button a green LED light will turn on. 
If the light has not reached that brightness level when the second player presses the button a buzzer will go off. 
*/

//potentiometer
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 9;  // Analog output pin that the LED is attached to
const int ledPin1 = 9;

//potentiometer
int sensorValue = 0;  // value read from the pot
int outputValue = 0;  // value output to the PWM (analog out)
int ledBrightness1 = 0;

//buzzer
const int buttonPin = 7;  // Arduino pin connected to button's pin
const int buzzerPin = 11;  // Arduino pin connected to Buzzer's pin

//interaction
const int ledPin2 = 3; 


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);
}
void loop() {

  //potentiometer
  sensorValue = analogRead(analogInPin);  // read the analog in value

  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  ledBrightness1 = map(sensorValue, 0, 1023, 0, 100);

  // change the analog out value:
  analogWrite(analogOutPin, outputValue);

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(2);

  analogWrite(ledPin1, ledBrightness1);
  // analogWrite(ledPin2, ledBrightness2);

  //////////////////////////////////////////////////////////////////////

  //buzzer

  int buttonState = digitalRead(buttonPin);  // read new state

  if (buttonState == LOW) {
    Serial.println("The button is being pressed");
    if (ledBrightness1 < 80){
        digitalWrite(buzzerPin, HIGH);  // turn on
    }  
    else if(ledBrightness1 >= 80) {
      digitalWrite(buzzerPin, LOW);  // turn off      
    } 
  } else if (buttonState == HIGH) {
    Serial.println("The button is unpressed");
    digitalWrite(buzzerPin, LOW);  // turn off
  }  


    /////////////////////////////////////////////////////////////////////

    //interaction between lights

     if (buttonState == LOW){
       if(ledBrightness1 >= 80){
          digitalWrite(ledPin2, HIGH);         
       }
      else if(ledBrightness1 < 80){
          digitalWrite(ledPin2, LOW);   
      }       
     }

}
