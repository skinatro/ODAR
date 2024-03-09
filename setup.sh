#!/bin/bash

cd "UserFacing"

# Run dummy.py in the background
python dummy.py &

# Start server.js in the foreground
node server.js &

# Wait a bit to allow the server to start
sleep 3

# Open browser
xdg-open http://localhost:3000

