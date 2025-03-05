const emailInput = document.getElementById("email-input");
const sendCodeButton = document.getElementById("send-code-button");
const codeInput = document.getElementById("code-input");
const verifyButton = document.getElementById("verify-button");
const emailMessage = document.getElementById("email-message");
const emailSection = document.getElementById("email-section");
const verificationSection = document.getElementById("verification-section");
const gameSection = document.getElementById("game-section");

let verificationCode = null;
let hasSpun = false;  // Restrict multiple spins

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simulate sending a verification code via email
sendCodeButton.addEventListener("click", () => {
    const email = emailInput.value.trim();

    // Check if the email is valid
    if (!emailRegex.test(email)) {
        emailMessage.textContent = "Please enter a valid email address.";
        emailMessage.style.color = "red";
        return;
    }

    // Display a loading message
    emailMessage.textContent = "Sending verification code...";
    emailMessage.style.color = "#3498db";

    // Simulate sending email (replace with actual API call in production)
    setTimeout(() => {
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Verification code sent to ${email}: ${verificationCode}`); // Replace with actual email API

        emailMessage.textContent = "A verification code has been sent to your email.";
        emailMessage.style.color = "green";

        // Show verification code input and hide email input
        emailSection.classList.add("hidden");
        verificationSection.classList.remove("hidden");
    }, 1500);
});

// Verify the code entered by the user
verifyButton.addEventListener("click", () => {
    const enteredCode = codeInput.value.trim();
    if (enteredCode === verificationCode) {
        emailMessage.textContent = "Email verified successfully!";
        emailMessage.style.color = "green";
        verificationSection.classList.add("hidden");
        gameSection.classList.remove("hidden");
    } else {
        emailMessage.textContent = "Invalid verification code. Please try again.";
        emailMessage.style.color = "red";
    }
});

// Function to reset to the email verification page
function resetToEmailVerification() {
    hasSpun = false; // Allow new spins for new verification
    emailInput.value = ""; // Clear email input
    codeInput.value = "";  // Clear code input
    emailMessage.textContent = ""; // Clear messages
    emailSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
    verificationSection.classList.add("hidden");
}
