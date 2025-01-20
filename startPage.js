document.addEventListener("DOMContentLoaded", () => {
    const loginGoogleBtn = document.getElementById("loginGoogleBtn");
    const loginFacebookBtn = document.getElementById("loginFacebookBtn");

    const checkAuthentication = async () => {
        try {
            const response = await fetch("/.auth/me");
            if (response.ok) {
                const userInfo = await response.json();
                if (userInfo.clientPrincipal != null) {
                    console.log(userInfo);
                    window.location.href = "/welcome";  
                } else {
                    console.log("Rip");
                    document.getElementById("loginGoogleBtn").style.display = "block";
                    document.getElementById("loginFacebookBtn").style.display = "block";

                }
            } else {
                document.getElementById("loginGoogleBtn").style.display = "block";
                document.getElementById("loginFacebookBtn").style.display = "block";

            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            document.getElementById("loginGoogleBtn").style.display = "block";
            document.getElementById("loginFacebookBtn").style.display = "block";

        }
    };

    // Call the checkAuthentication function when the page loads
    checkAuthentication();

    // Handle Google login functionality
    loginGoogleBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/google"; // Redirect to Google login
    });
    
    loginFacebookBtn.addEventListener("click", () => {
        window.location.href = "/.auth/login/facebook"; // Redirect to Google login
    });
});