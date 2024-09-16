const userModel = require("../Model/userModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { resetPaswordMail } = require("../assets/nodeMailer");
const { generatePDF } = require("../utils/pdfGenerator");

async function generateToken({
    data = {},
    tokenSecret = process.env.JWT_ACCESS_SECRET,
    expiresIn = "1d",
} = {}) {
    return await JWT.sign(data, tokenSecret, { expiresIn });
}

async function signup(req, res) {
    try {
        const userData = await userModel.signup(req.body);
        res.status(200).json({
            userData,
            msg: "You Have Signed Up Successfully",
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function login(req, res) {
    try {
        const userData = await userModel.login(req.body);
        if (!userData.isApproved) {
            throw new Error(
                "Your Account Is Still Pending For Approval. Please Contact Admin"
            );
        }
        const tokenData = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
        };
        const accessToken = await generateToken({ data: tokenData });

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }); // 1 day
        res.status(200).json({
            userData,
            msg: "Login Successful",
            token: accessToken,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ msg: "Logout Successfull" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function forgotPassword(req, res) {
    const { email } = req.body;
    const from = process.env.EMAIL_FROM;
    try {
        if (!email) {
            throw new Error("No Email Provided");
        }
        const emailResponse = await resetPaswordMail(email, from);
        res.status(200).json({ msg: "Email Sent" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function resetPassword(req, res) {
    const { resetToken, newPassword, confirmPassword } = req.body;
    try {
        if (newPassword !== confirmPassword) {
            throw new Error("Passwords Not Matching");
        }
        const decode = await JWT.decode(
            resetToken,
            process.env.JWT_ACCESS_SECRET
        );
        const user = await userModel.findById(decode.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await userModel.findByIdAndUpdate(user.id, {
            password: hashedPassword,
        });
        res.status(200).json({ msg: "Password Reset Successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function validateToken(req, res) {
    const { accessToken } = req.body;

    let validateAccessToken = false;
    let tokenValidation = false;
    let msg;
    let user;

    validateAccessToken = await JWT.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET,

        async (error, decode) => {
            if (error) {
                return false;
            }
            msg = "Your Session is Valid";
            tokenValidation = true;
            return true;
        }
    );

    if (!validateAccessToken) {
        res.status(401).json({ msg: "Your Session is Expired" });
    }

    const decodeToken = await JWT.decode(
        accessToken,
        process.env.JWT_ACCESS_SECRET
    );

    if (validateAccessToken === true) {
        user = await userModel.findById(decodeToken.id);
    }

    res.status(200).json({
        tokenValidation,
        validateAccessToken,
        msg,
        user,
    });
}

// async function approveUser (req,res) {
//     try {
//         const user = await userModel.approveUser(req.body);
//         res.status(200).json({ msg: "User approved successfully", user });
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// };

async function approveUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { isApproved: true },
            { new: true }
        );
        if (!user) throw new Error("User not found");
        res.status(200).json({ msg: "User Approved Successfully", user });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// async function rejectUser (req,res) {
//     try {
//         const user = await userModel.rejectUser(req.body);
//         res.status(200).json({ msg: "User Rejected", user });
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }

async function rejectUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { isApproved: false },
            { new: true }
        );
        if (!user) throw new Error("User not found");
        res.status(200).json({ msg: "User Rejected Successfully", user });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function downloadPDF(req, res) {
    try {
        const formData = req.body;
        const content = JSON.stringify(formData, null, 2); // Format your content as needed
        
        const pdfData = await generatePDF(content);

        res.setHeader('Content-Disposition', 'attachment; filename=DK_Recruitment_Form.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    validateToken,
    approveUser,
    rejectUser,
    downloadPDF,
};
