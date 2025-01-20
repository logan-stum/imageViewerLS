document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn"); // Add ID for the logout button
    const userDetails = document.getElementById("userDetails");

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

    loginBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/google"; 
    });

    logoutBtn.addEventListener("click", () => {
        window.location.href = "/.auth/logout";
    });

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
            if (userInfo.length > 0) {
                userDetails.textContent = `Logged in as: ${userInfo[0].userId}`;
                loginBtn.style.display = "none"; // Hide login button
                logoutBtn.style.display = "block"; // Show logout button
            }
        })
        .catch((err) => {
            console.warn("User not logged in:", err);
            userDetails.textContent = "Not logged in.";
            loginBtn.style.display = "block"; // Show login button
            logoutBtn.style.display = "none"; // Hide logout button
        });
});
