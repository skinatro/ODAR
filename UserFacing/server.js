const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const wsPort = 8080; // Separate port for WebSocket server
const threshold = 100;

let lastLevels = 0;
const clients = new Set();

app.use(bodyParser.json());
app.use(express.static('site-src'));

app.route('/data')
  .post((req, res) => {
    const levels = req.body.levels;
    console.log(`Received sensor data: Levels - ${levels}`);

    lastLevels = levels;
    const message = `The levels are: ${levels}`;
    const warning = levels > threshold ? `**Threshold exceeded! Take action!**` : '';

    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ levels, message, warning }));
      }
    }

    res.send(`${message}\n${warning}`);
  })
  .get((req, res) => {
    console.log(`Sending sensor data (GET request): Levels - ${lastLevels}`);
    const message = `The levels are: ${lastLevels}`;
    const warning = lastLevels > threshold ? `**Threshold exceeded! Take action!**` : '';
    res.send(`${message}\n${warning}`);
  });

const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.send(JSON.stringify({ levels: lastLevels }));
});

app.listen(port, () => console.log(`HTTP server listening on port ${port}`));
console.log(`WebSocket server listening on port ${wsPort}`);
