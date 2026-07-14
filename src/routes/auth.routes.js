

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");
//router.post("/signup", authController.signup);
router.post(
    "/signup",
    upload.single("profileImage"),
    authController.signup
);
router.post("/verify-otp", authController.verifyOTP);
module.exports = router;


