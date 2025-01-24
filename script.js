document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const logoutBtn = document.getElementById("logoutBtn"); // Add ID for the logout button
    const weatherInfoDiv = document.getElementById("weatherInfo");

    let img;

    try {
        // Get the user's location
        if (!navigator.geolocation) {
            weatherInfoDiv.innerHTML = "Geolocation is not supported by your browser.";
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch weather data using Meteostat
            const apiKey = "f8d55b7a3emshcf2e49d20e251b3p157e29jsna3d4ebdf116e"; // Replace with your actual API key
            const url = `https://api.meteostat.net/v2/point/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.data) {
                const weather = data.data[0]; // Meteostat API returns weather in the `data` array
                weatherInfoDiv.innerHTML = `
                    <h3>Weather Information:</h3>
                    <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
                    <p><strong>Condition:</strong> ${weather.condition}</p>
                    <p><strong>Wind Speed:</strong> ${weather.wind_speed} km/h</p>
                `;
            } else {
                weatherInfoDiv.innerHTML = "Unable to fetch weather data.";
            }
        }, (error) => {
            weatherInfoDiv.innerHTML = `Failed to get location: ${error.message}`;
        });
    } catch (err) {
        weatherInfoDiv.innerHTML = `Error fetching weather data: ${err.message}`;
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