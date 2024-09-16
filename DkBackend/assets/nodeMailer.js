const UserModel = require('../Model/userModel');

const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function resetPasswordMail(to, from) {
    const user = await userModel.findOne({ email: to });
    if (!user) {
        throw new Error("User Not Found");
    }
    const resetToken = JWT.sign(
        { id: user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15min" }
    );

    const output = `
        <h3>Password Reset Link</h3>
        <p>This link will expire in 15 minutes</p>
        <a href="http://localhost:5173/user/resetPassword?t=${resetToken}" target="_blank">Reset Link</a>
    `;
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_AUTH_USER_EMAIL,
            pass: process.env.EMAIL_AUTH_PASSWORD,
        },
    });

    const mailOptions = {
        from,
        to,
        subject: "Reset Password Link",
        html: output
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

module.exports = { resetPasswordMail };
