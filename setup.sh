#!/bin/bash

cd "UserFacing"

# Run dummy.py in the background


# Start server.js in the foreground
node server.js &

sleep 3

python dummy.py &

# Wait a bit to allow the server to start


# Open browser
xdg-open http://localhost:3000

