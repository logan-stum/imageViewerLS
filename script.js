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

    function updateAuthUI(isAuthenticated) {
        if (isAuthenticated) {
            loginBtn.style.display = "none"; // Hide login button
            logoutBtn.style.display = "block"; // Show logout button
        } else {
            loginBtn.style.display = "block"; // Show login button
            logoutBtn.style.display = "none"; // Hide logout button
        }
    }


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
                // User is authenticated
                userDetails.textContent = `Logged in as: ${userInfo[0].userId}`;
                updateAuthUI(true); // Show logout button, hide login
            } else {
                // User is not authenticated
                updateAuthUI(false); // Show login button, hide logout
            }
        })
        .catch(() => {
            // In case of error (e.g., no session or network issue)
            updateAuthUI(false); // Show login button, hide logout
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
