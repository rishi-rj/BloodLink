const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// Reset Password || POST
router.post("/reset-password", resetPasswordController);

module.exports = router;
