const { Router } = require("express");
const {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    validateToken,
    approveUser,
    rejectUser,
    downloadPDF,
} = require("../Controller/userController");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/validateToken", validateToken);
userRouter.post("/api/downloadPDF", downloadPDF); 

// Routes for approving or rejecting users
userRouter.patch("/approveUser/:userId", approveUser);
userRouter.patch("/rejectUser/:userId", rejectUser);

module.exports = userRouter;
