const dataContainer = document.getElementById('data-container');

function updateData() {
  fetch('/data')
    .then(response => response.text())
    .then(data => {
      const levels = data.split('\n')[0];
      const message = data;
      updateDataUI(levels, message);
    })
    .catch(error => console.error(error));
}

function updateDataUI(levels, message) {
  dataContainer.innerHTML = `<p>${message}</p>`;
}

// Fetch data every 2 seconds
setInterval(updateData, 2000);
