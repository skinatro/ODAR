import requests
import random
import time
import signal

server_url = "http://localhost:3000/data"

running = True  # Flag to control loop execution

def signal_handler(sig, frame):
  global running
  running = False
  print("Interrupt received, stopping updates.")

signal.signal(signal.SIGINT, signal_handler)  # Register interrupt handler

while running:
  sensor_data = {"levels": random.randint(30, 50)}  # Randomize levels

  # Send POST request
  response = requests.post(server_url, json=sensor_data)

  # Check for response
  if response.status_code == 200:
    print(f"Data sent successfully! (Levels: {sensor_data['levels']})")
  else:
    print("Error sending data:", response.status_code)

  time.sleep(2)

print("Exiting...")