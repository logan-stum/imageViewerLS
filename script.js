document.addEventListener("DOMContentLoaded", () => {
    const loadImageBtn = document.getElementById("loadImageBtn");
    const imageContainer = document.getElementById("imageContainer");
    const resizeControls = document.getElementById("resizeControls");
    const resizeSlider = document.getElementById("resizeSlider");

    let img; // To store the image element globally

    loadImageBtn.addEventListener("click", () => {
        // Check if an image is already loaded
        if (imageContainer.querySelector("img")) {
            alert("Image is already loaded!");
            return;
        }

        // Create an image element dynamically
        img = document.createElement("img");
        img.src = "https://pswcsweng861ls.blob.core.windows.net/images/violetCool.jpg"; // Path to your image
        img.alt = "Violet";
        img.style.width = resizeSlider.value + "px"; // Set initial size
        img.onload = () => console.log("Image loaded successfully!");
        img.onerror = () => console.error("Failed to load image!");

        // Append the image to the container
        imageContainer.appendChild(img);

        resizeControls.style.display = "block";

    });

    resizeSlider.addEventListener("input", () => {
        if (img) {
            img.style.width = resizeSlider.value + "px";
        }
    });
});
