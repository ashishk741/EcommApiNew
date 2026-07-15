

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");
//router.post("/signup", authController.signup);
const authMiddleware = require("../middleware/auth.middleware");
router.post(
    "/signup",
    upload.single("profileImage"),
    authController.signup
);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);

router.post(
    "/refresh-token",
    authController.refreshToken
);

//router.post("/logout", authController.logout);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);

module.exports = router;


