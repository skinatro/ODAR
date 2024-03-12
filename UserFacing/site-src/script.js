const ws = new WebSocket('ws://localhost:8080'); // Conpnect to WebSocket server

// Enhanced error handling for WebSocket connection:
ws.onopen = () => {
  console.log('Connected to WebSocket server');
  updateData(); // Call updateData() to initiate upon successful connection
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
  // Implement error handling logic (e.g., retry connection, display error message)
};

const dataContainer = document.getElementById('data-container');
const canvas = document.getElementById('myChart'); // Assuming a canvas element exists
const ctx = canvas.getContext('2d');


// Animation variables (adjust as needed)
let previousTimestamp = 0;
const animationFrame = (timestamp) => {
  previousTimestamp = timestamp;
  requestAnimationFrame(animationFrame); // Schedule the next animation frame
  updateDataUI(); // Update UI with the latest data
};

function updateData() {
  ws.onmessage = (event) => { // Handle incoming data over WebSocket
    const data = JSON.parse(event.data);
    const levels = data.levels;
    const message = data.message;
    const warning = data.warning;

    updateDataUI(levels, message, warning);
  };
}

let chart = null; // Initialize chart outside the function

function updateDataUI(levels, message, warning) {
  // Update text content
  dataContainer.innerHTML = `
    <p>${message}</p>
    ${warning ? `<p style="color: red;">**${warning}**</p>` : ''}
  `;

  // Chart.js initialization
  if (!chart) {
    const chartData = {
      labels: [], // Placeholder for timestamps
      datasets: [{
        label: 'Sensor Data',
        data: [], // Placeholder for sensor data
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }

  // Update chart data
  const timestamp = performance.now() - previousTimestamp;
  chart.data.labels.push(timestamp.toFixed(2));
  chart.data.datasets[0].data.push(levels);
  chart.update();
}

updateData(); // Initiate data fetching and animation