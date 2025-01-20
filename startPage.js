document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

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
});