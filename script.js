document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn"); // Add ID for the logout button
    const userDetails = document.getElementById("userDetails");

    let img;

    const checkAuthentication = async () => {
        try {
            const response = await fetch("/.auth/me");  // Check if the user is logged in
            if (response.ok) {
                const userInfo = await response.json();
                if (userInfo.length > 0) {
                    // If logged in, redirect to the welcome page
                    window.location.href = "/welcome";  // Change this to your actual welcome page URL
                } else {
                    // If not logged in, show the login button
                    document.getElementById("loginBtn").style.display = "block";
                }
            } else {
                // If the authentication check fails, show the login button
                document.getElementById("loginBtn").style.display = "block";
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            // If there was an error checking auth, show login button
            document.getElementById("loginBtn").style.display = "block";
        }
    };

    // Call the checkAuthentication function when the page loads
    checkAuthentication();

    // Handle Google login functionality
    loginBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/google"; // Redirect to Google login
    });

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