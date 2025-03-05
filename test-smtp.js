const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP2GO_USERNAME,
        pass: process.env.SMTP2GO_PASSWORD
    }
});

const mailOptions = {
    from: `"Spin and Win" <${process.env.SMTP2GO_EMAIL}>`,  // Must have a valid domain
    to: process.env.SMTP2GO_EMAIL,
    subject: "SMTP2GO Test",
    text: "This is a test email to verify SMTP2GO settings."
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("SMTP2GO Error:", error);
    } else {
        console.log("Test email sent:", info.response);
    }
});
