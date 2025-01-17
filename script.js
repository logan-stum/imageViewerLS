document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const textInput = document.getElementById("textInput");
    const submitTextBtn = document.getElementById("submitTextBtn");
    const sanitizedText = document.getElementById("sanitizedText");

    loadImageBtn.addEventListener("click", () => {
        if (imageContainer.querySelector("img")) {
            alert("Image is already loaded!");
            return;
        }

        const img = document.createElement("img");
        img.src = "https://pswcsweng861ls.blob.core.windows.net/images/violetCool.jpg";
        img.alt = "Violet";
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

        sanitizedText.innerHTML = sanitized || "No text submitted.";
    });
});
