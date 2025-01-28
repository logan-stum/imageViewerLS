// main.js

document.addEventListener("DOMContentLoaded", function () {
    // Start by fetching data from the Meteostat API
    fetchDataFromMeteostat();
});

// This function is triggered once the data is fetched from Meteostat and validated
function handleData(response) {
    console.log('Data fetched from Meteostat:', response);

    // Validate and save the data if valid
    validateAndSaveData(response);
}

// Display the fetched weather data on the webpage
function displayWeatherData(weatherData) {
    const container = document.getElementById('weather-data-container');
    container.innerHTML = '';  // Clear any previous data

    if (weatherData && weatherData.length > 0) {
        weatherData.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.classList.add('weather-record');
            recordElement.innerHTML = `
                <strong>Date:</strong> ${record.date}<br>
                <strong>High Temp:</strong> ${record.tmax} °C<br>
                <strong>Low Temp:</strong> ${record.tmin} °C<br>
                <strong>Precipitation:</strong> ${record.prcp} mm
            `;
            container.appendChild(recordElement);
        });
    } else {
        container.innerHTML = '<p>No weather data available.</p>';
    }
}

// Fetch data from the Meteostat API
function fetchDataFromMeteostat() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var dateUTC = new Date()
        const currentDate = toIsoString(dateUTC).split('T')[0]; 
        const apiUrl = `https://meteostat.p.rapidapi.com/point/daily?lat=${latitude}&lon=${longitude}&alt=113&start=${currentDate}&end=${currentDate}`;
        const apiKey = 'f8d55b7a3emshcf2e49d20e251b3p157e29jsna3d4ebdf116e'; // Replace with your actual API key.

        xhr.open('GET', apiUrl, true);
        xhr.setRequestHeader('x-rapidapi-key', apiKey);
        xhr.setRequestHeader('x-rapidapi-host', 'meteostat.p.rapidapi.com');

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                handleData(response);  // Process the fetched data
            } else {
                console.error('Failed to fetch data', xhr.status, xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error('Error in XHR request');
        };

        xhr.send();
    });
}

// Handle the data after validation and saving
function handleData(response) {
    if (!response || !response.data) {
        console.error('Invalid response structure:', response);
        return;
    }

    // Call validation and save data to IndexedDB
    validateAndSaveData(response);

    // Display the data on the web page (Optional)
    displayWeatherData(response.data);
}


function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }