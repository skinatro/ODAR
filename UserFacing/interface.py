import serial
import requests
import random
import time
import signal
import re

server_url = "http://localhost:3000/data"
baudrate = 9600  # Set the correct baud rate for your Arduino

running = True  # Flag to control loop execution

def signal_handler(sig, frame):
    global running
    running = False
    print("Interrupt received, stopping updates.")

def parse_arduino_data(data):
    """
    Parses the received Arduino data to extract only the numbers.

    Args:
        data (str): The raw data received from the serial port.

    Returns:
        dict: A dictionary containing the extracted numeric values.
    """

    # Extract numbers using regular expressions (adjust pattern if needed)
    numbers = re.findall(r"\d+", data)

    # Check if any numbers were found
    if not numbers:
        return {}  # Return empty dictionary if no numbers

    # Assuming there's a single sensor value:
    sensor_value = int(numbers[0])  # Convert the first number to integer

    # Create a dictionary with the extracted value (modify as needed)
    return {"levels": sensor_value}

signal.signal(signal.SIGINT, signal_handler)  # Register interrupt handler

try:
    ser = serial.Serial('/dev/ttyUSB0', baudrate=baudrate)

    while running:
        # Read data from serial port
        data = ser.readline().decode('utf-8').strip()

        if data:
            # Process the received data from Arduino
            sensor_data = parse_arduino_data(data)  # Replace with your parsing function

            # Send POST request to server
            response = requests.post(server_url, json=sensor_data)

            if response.status_code == 200:
                print(f"Data sent successfully! (Levels: {sensor_data['levels']})")
            else:
                print("Error sending data:", response.status_code)

        # Wait before next update
        time.sleep(random.uniform(1.5, 3.0))

except serial.SerialException as e:
    print(f"Error opening serial port: {e}")
finally:
    if ser:
        ser.close()
        print("Serial port closed.")

print("Exiting...")

