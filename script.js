document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const loginBtn = document.getElementById("loginBtn"); // Add an ID for the login button

    let img;

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

        // Sanitize user input by escaping special characters
        const sanitized = userInput
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
            textInput.value = sanitized;
    });

    loginBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/google"; // Redirect to Google login
    });

    // Optional: Check if the user is logged in and display user info
    fetch("/.auth/me")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Not logged in");
            }
        })
        .then((userInfo) => {
            console.log("User Info:", userInfo);
            const userDetails = document.getElementById("userDetails");
            if (userInfo.length > 0) {
                userDetails.textContent = `Logged in as: ${userInfo[0].userId}`;
            }
        })
        .catch((err) => console.warn("User not logged in:", err));
});
