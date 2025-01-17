document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");

    loadImageBtn.addEventListener("click", () => {
        // Check if an image is already loaded
        if (imageContainer.querySelector("img")) {
            alert("Image is already loaded!");
            return;
        }

        // Create an image element dynamically
        const img = document.createElement("img");
        img.src = "https://pswcsweng861ls.blob.core.windows.net/images/violetCool.jpg"; // Path to your image
        img.alt = "Dynamically loaded image";
        img.onload = () => console.log("Image loaded successfully!");
        img.onerror = () => console.error("Failed to load image!");

        // Append the image to the container
        imageContainer.appendChild(img);
    });
});
