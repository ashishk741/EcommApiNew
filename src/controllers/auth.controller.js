const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const result = await authService.signup(req);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  
};

exports.verifyOTP = async (req, res) => {
  try {
    const result = await authService.verifyOTP(req.body);
console.log("OTP BODY:", req.body);
    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


//Login
exports.login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            data: result

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

//Refresh
exports.refreshToken = async (req, res) => {

    try {

        const result =
            await authService.refreshToken(
                req.body.refreshToken
            );

        return res.json({

            success: true,

            data: result

        });

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: error.message

        });

    }

};

//Logout
exports.logout = async (req, res) => {

    try {

        const result = await authService.logout(req.user.id);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const authService = require("../services/auth.service");
const { sendForgotPasswordOTP } = require("../services/email.service");


// =====================================
// FORGOT PASSWORD
// =====================================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const result = await authService.forgotPassword(email);

    await sendForgotPasswordOTP(
      email,
      result.otp
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email"
    });

  } catch (error) {

    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// RESET PASSWORD
// =====================================
const resetPassword = async (req, res) => {
  try {

    const {
      email,
      otp,
      newPassword
    } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    await authService.resetPassword(
      email,
      otp,
      newPassword
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {

    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  forgotPassword,
  resetPassword
};