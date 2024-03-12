// initializes or defines the output pin of the LM35 temperature sensor
int sensor = A0;
//this sets the ground pin to LOW and the input voltage pin to high
void setup() {
Serial.begin(9600); 
}

void loop(){

float read = analogRead(sensor);
float temperature = read;
Serial.print("The temperature is ");
Serial.println(temperature);
delay(1000);
}