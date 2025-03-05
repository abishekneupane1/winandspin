document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email-input");
    const sendCodeButton = document.getElementById("send-code-button");
    const emailMessage = document.getElementById("email-message");
    const verificationSection = document.getElementById("verification-section");
    const gameSection = document.getElementById("game-section");
    const emailSection = document.getElementById("email-section");
    const codeInput = document.getElementById("code-input");
    const verifyButton = document.getElementById("verify-button");
    const spinButton = document.getElementById("spin-button");
    const result = document.getElementById("result");
    const wheelCanvas = document.getElementById("wheel");
    const ctx = wheelCanvas.getContext("2d");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let verificationCode = null;
    let isSpinning = false;

    const prizes = [
        "10% Discount",
        "Free Shipping",
        "20% Discount",
        "Buy 1 Get 1 Free",
        "Mystery Gift",
        "5% Discount",
        "Exclusive Offer",
        "No Luck! Try Again"
    ];

    const colors = ["#FF6F61", "#FFD3B6", "#84B6F4", "#9AD0F5", "#FFABAB", "#FFE6E6", "#D4A5A5", "#FFDDC1"];

    // Draw the wheel
    const drawWheel = () => {
        const numSections = prizes.length;
        const arcSize = (2 * Math.PI) / numSections;
        const centerX = wheelCanvas.width / 2;
        const centerY = wheelCanvas.height / 2;
        const radius = 200;

        for (let i = 0; i < numSections; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, i * arcSize, (i + 1) * arcSize);
            ctx.fill();
            ctx.save();

            ctx.translate(centerX, centerY);
            ctx.rotate(i * arcSize + arcSize / 2);
            ctx.fillStyle = "#333";
            ctx.font = "bold 16px Poppins";
            ctx.textAlign = "right";
            ctx.fillText(prizes[i], radius - 20, 10);
            ctx.restore();
        }

        // Draw pointer
        ctx.beginPath();
        ctx.fillStyle = "#FF6F61";
        ctx.moveTo(centerX, centerY - radius - 20);
        ctx.lineTo(centerX - 10, centerY - radius);
        ctx.lineTo(centerX + 10, centerY - radius);
        ctx.closePath();
        ctx.fill();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF6F61";
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Poppins";
        ctx.textAlign = "center";
        ctx.fillText("SPIN", centerX, centerY + 6);
    };

    drawWheel();

    // Send verification code
    sendCodeButton.addEventListener("click", async (event) => {
        event.preventDefault();  // Prevent form default behavior

        const email = emailInput.value.trim();

        if (!emailRegex.test(email)) {
            emailMessage.textContent = "Please enter a valid email address.";
            emailMessage.style.color = "red";
            return;
        }

        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            const response = await fetch("http://localhost:3000/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    code: verificationCode
                })
            });

            if (response.ok) {
                emailMessage.textContent = "Verification code sent!";
                emailMessage.style.color = "green";
                emailSection.classList.add("hidden");
                verificationSection.classList.remove("hidden");
            } else {
                emailMessage.textContent = "Failed to send email.";
                emailMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            emailMessage.textContent = "Error connecting to the server.";
            emailMessage.style.color = "red";
        }
    });

    // Verify code and show the wheel game
    verifyButton.addEventListener("click", () => {
        const enteredCode = codeInput.value.trim();
        if (enteredCode === verificationCode) {
            verificationSection.classList.add("hidden");
            gameSection.classList.remove("hidden");
        } else {
            alert("Incorrect verification code. Please try again.");
        }
    });

    // Spin the wheel functionality
    spinButton.addEventListener("click", () => {
        if (isSpinning) return;
        isSpinning = true;
        spinButton.disabled = true;

        const randomIndex = Math.floor(Math.random() * prizes.length);
        const prize = prizes[randomIndex];
        let angle = 0;
        const targetAngle = 360 * 5 + (randomIndex * (360 / prizes.length));

        const spinInterval = setInterval(() => {
            angle += 20;
            ctx.clearRect(0, 0, 500, 500);
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.translate(-250, -250);
            drawWheel();
            ctx.restore();

            if (angle >= targetAngle) {
                clearInterval(spinInterval);
                result.textContent = `Congratulations! You won ${prize}! 🎉`;
                setTimeout(() => {
                    result.textContent = "";
                    gameSection.classList.add("hidden");
                    emailSection.classList.remove("hidden");
                    spinButton.disabled = false;
                    isSpinning = false;
                }, 10000);
            }
        }, 20);
    });
});
