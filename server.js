const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 587,   // Use 465 for SSL if needed
    secure: false,  // Must be false for port 587 (true for 465)
    auth: {
        user: process.env.SMTP2GO_USERNAME,
        pass: process.env.SMTP2GO_PASSWORD
    }
});

app.post("/send-email", (req, res) => {
    const { email, code } = req.body;

    const mailOptions = {
        from: `"Spin and Win" <${process.env.SMTP2GO_EMAIL}>`,  // Ensure a valid domain
        to: email,
        subject: "Your Spin and Win Verification Code",
        text: `Your verification code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);  // Log detailed error
            res.status(500).json({ message: "Failed to send email.", error: error.message });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Verification code sent!" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
