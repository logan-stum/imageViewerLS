document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn"); // Add ID for the logout button
    const userDetails = document.getElementById("userDetails");

    logoutBtn.style.display = "none";

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

        const sanitized = userInput
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        textInput.value = sanitized;
    });

    // Check if the user is already logged in
    fetch("/.auth/me")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("User is not authenticated");
            }
        })
        .then((userInfo) => {
            if (userInfo.length > 0) {
                userDetails.textContent = `Logged in as: ${userInfo[0].userId}`;
                loginBtn.style.display = "none"; // Hide login button if user is logged in
                logoutBtn.style.display = "block"; // Show logout button if user is logged in
            }
        })
        .catch(() => {
            loginBtn.style.display = "block"; // Show login button if user is not logged in
            logoutBtn.style.display = "none"; // Hide logout button if user is not logged in
        });

    // Handle Google login functionality
    loginBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/google"; // Redirect to Google login
    });
    
    // Handle Google logout functionality
    logoutBtn.addEventListener("click", () => {
        window.location.href = "/.auth/logout"; // Redirect to logout
    });
});
