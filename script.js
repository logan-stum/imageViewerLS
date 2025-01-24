document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const logoutBtn = document.getElementById("logoutBtn"); // Add ID for the logout button
    const weatherInfoBtn = document.getElementById("weatherBtn");

    let img;

    weatherInfoBtn.addEventListener("click", () => {
        if (!navigator.geolocation) {
            weatherInfoBtn.innerHTML = "Geolocation is not supported by your browser.";
            return;
        }
    
        // Get the user's location
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const data = null;
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
    
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    try {
                        // Parse the response text
                        const response = JSON.parse(this.responseText);
    
                        // Check if the response contains valid data

                        if (response && response.data && response.data.length > 0) {
                            const weather = response.data[0]; // Get the first weather record
                            const output = `
                                <h3>Current Weather:</h3>
                                <p><strong>Temperature:</strong> ${weather.temp}°C</p>
                                <p><strong>Wind Speed:</strong> ${weather.wspd} km/h</p>
                                <p><strong>Humidity:</strong> ${weather.rhum}%</p>
                                <p><strong>Condition:</strong> ${weather.condition}</p>
                            `;
                            weatherInfoBtn.innerHTML = output;
                        } else {
                            weatherInfoBtn.innerHTML = "No weather data available.";
                        }
                    } catch (err) {
                        weatherInfoBtn.innerHTML = `Error parsing weather data: ${err.message}`;
                    }
                }
            });
    
            var dateUTC = new Date()
            const currentDate = toIsoString(dateUTC).split('T')[0]; 
            // Open the request with dynamic latitude and longitude
            xhr.open(
                'GET',
                `https://meteostat.p.rapidapi.com/point/daily?lat=${latitude}&lon=${longitude}&alt=113&start=${currentDate}&end=${currentDate}`
            );
    
            // Set the required headers
            xhr.setRequestHeader('x-rapidapi-key', 'f8d55b7a3emshcf2e49d20e251b3p157e29jsna3d4ebdf116e');
            xhr.setRequestHeader('x-rapidapi-host', 'meteostat.p.rapidapi.com');
    
            // Send the request
            xhr.send(data);
        }, (error) => {
            // Handle location errors
            weatherInfoBtn.innerHTML = `Failed to get location: ${error.message}`;
        });
    });

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

    // Handle Google logout functionality
    logoutBtn.addEventListener("click", () => {
        window.location.href = "/.auth/logout"; // Redirect to logout
    });

    loadImageBtn.addEventListener("click", () => {
        if (imageContainer.querySelector("img")) {
            alert("Image is already loaded!");
            return;
        }

        img = document.createElement("img");
        img.src = "https://pswcsweng861ls.blob.core.windows.net/images/violetCool.jpg";
        img.alt = "Violet";
        img.width = 500;
        img.height = 500;
        img.onload = () => console.log("Image loaded successfully!");
        img.onerror = () => console.error("Failed to load image!");

        imageContainer.appendChild(img);
    });

    submitTextBtn.addEventListener("click", () => {
        const userInput = textInput.value;

        const sanitized = userInput
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        textInput.value = sanitized;
    });
});