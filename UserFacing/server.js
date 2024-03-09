const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse incoming data as JSON
app.use(bodyParser.json());

// Serve static files from "site-src"
app.use(express.static('site-src'));

const threshold = 100; // Adjust threshold value

let lastLevels = 0;

// Handle both POST and GET request
app.route('/data')
  .post((req, res) => {
    //POST handling logic
    const levels = req.body.levels;
    console.log(`Received sensor data: Levels - ${levels}`);

    lastLevels = levels;

    const message = `The levels are: ${levels}`;
    const warning = levels > threshold ? `**Threshold exceeded! Take action!**` : '';

    res.send(`${message}\n${warning}`);
  })
  .get((req, res) => {
    // Handle GET requests (e.g., send current sensor data)
    const levels = lastLevels; // Replace with actual sensor data retrieval logic
    console.log(`Sending sensor data: Levels - ${levels}`);

    const message = `The levels are: ${levels}`;
    const warning = levels > threshold ? `**Threshold exceeded! Take action!**` : '';

    res.send(`${message}\n${warning}`);
  });

app.listen(port, () => console.log(`Server listening on port ${port}`));
