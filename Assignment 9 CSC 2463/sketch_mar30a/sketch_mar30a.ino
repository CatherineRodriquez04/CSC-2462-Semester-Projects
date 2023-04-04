

int buttonPin1 = 2;
int buttonPin2 = 4;
int buttonState1 = 0;
int buttonState2 = 0;
int ledState1 = LOW;
int ledState2 = LOW;
int ledPin1 = 12;
int ledPin2 = 11;
unsigned long previousMillis = 0;
unsigned long previousMillis2 = 0;
long interval = 1000;
long interval2 = 2000;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);
unsigned long currentMillis = millis();

    // if the LED is off turn it on and vice-versa:
    if (buttonState1 == HIGH) {
      
       if (currentMillis - previousMillis >= interval) {  // save the last time you blinked the LED
          previousMillis = currentMillis;

          // if the LED is off turn it on and vice-versa:
          if (ledState1 == LOW) {
            ledState1 = HIGH;
          } 
          else {
            ledState1 = LOW;
          }

          if (ledState2 == LOW) {
            ledState2 = HIGH;
          } 
          else {
            ledState2 = LOW;
          }

          // set the LED with the ledState of the variable:
          digitalWrite(ledPin1, ledState1);
          digitalWrite(ledPin2, ledState2);
      }
    
    }

   else if (buttonState2 ==HIGH) {

       if (currentMillis - previousMillis2 >= interval2) {  // save the last time you blinked the LED
       previousMillis2 = currentMillis;

          // if the LED is off turn it on and vice-versa:
          if (ledState2 == LOW) {
              ledState2 = HIGH;
          } 
          else {
              ledState2 = LOW;
          }

           // set the LED with the ledState of the variable:
          digitalWrite(ledPin2, ledState2);
      }
    }
    
     else {
      digitalWrite(ledPin1,LOW);
      digitalWrite(ledPin2,LOW);
      }

    // set the LED with the ledState of the variable
  } // put your main code here, to run repeatedly:

