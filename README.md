# ODAR (Odour Detection And Removal)

This project uses `MQ-135` sensor and Arduino Nano Rev 3 to detect the surrounding ammonia content and sends signal to take required actions accordingly.

## How to Use
### Cloning Repo 
Run the following command in the terminal

`$ git clone https://github.com/skinatro/ODAR`

### Installing NPM Packages
Run the following command in the terminal

`$ npm install express body-parser`

### Dependencies Needed
Make sure you have the following programs installed on your system 
1. NodeJs
2. Python
3. Git
4. Fritzing
5. Arduino IDE

Arch Linux

`paru -S nodejs python git code fritzing arduino-ide-bin arduino-docs`

### Run
Run the program using either `setup.bash` or `setup.bat` depending on your platform

## Features

- Monitors the Ammonia contant in air.
- Easy monitor the ammonia values via your website(or locally) using Arduino Wifi Module
- Can be extended to automate additional IoT tasks if a certain threshold is exceeded

## To DO

- Use a real Arduino to send the POST Requests (Currently using a dummy python script due to lack of a wifi module)
- Add support to monitor multiple Nodes 
- Design a protective enclosure for the device
- Improve the UI
- Setup a deployment service
