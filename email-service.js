import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.SMTP2GO_USERNAME,
        pass: process.env.SMTP2GO_PASSWORD
    }
});

export function sendVerificationEmail(email, code) {
    const mailOptions = {
        from: `Spin and Win <${process.env.SMTP2GO_USERNAME}>`,
        to: email,
        subject: "Your Spin and Win Verification Code",
        text: `Your verification code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
