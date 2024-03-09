#define ANALOG A6
#define DIGITAL D5
#define MOUNT 200
#define SFIT 150

int analog_in, digital_in;

void setup() {
  serial.begin(9600);
  //idk wtf is this
  pinMode(ANALOG,INPUT);
  pinMode(DIGITAL,INPUT);
}

void loop() {
  analog_in = analogRead(ANALOG);
  digital_in = digitalRead(DIGITAL);

  Serial.print("The ammonia level is: ");
  Serial.prtinln(analog_in);

  if(analog_in > MOUNT){
    Serial.println("Hazardous Levels of ammonia detected");
    Serial.println("Immediate acton needed");
  }
  else if (analog_in > SFIT){
    Serial.println("Moderate Levels of ammonia detected");
    Serial.println("Take preventive measures");
  }
  else{
    Serial.println("Tolerable Levels");
  }
  delay(1000);
}
