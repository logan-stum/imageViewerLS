document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

        const checkAuthentication = async () => {
        try {
            const response = await fetch("/.auth/me");
            if (response.ok) {
                var userInfo = JSON.parse(await response.json());
                if (userInfo.length > 0) {
                    console.log(userInfo);
                    window.location.href = "/welcome";  
                } else {
                    console.log("Rip");
                    document.getElementById("loginBtn").style.display = "block";
                }
            } else {
                document.getElementById("loginBtn").style.display = "block";
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
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