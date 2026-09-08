const authService = require("../services/auth.service");
const { sendForgotPasswordOTP } = require("../utils/sendMail");


// =====================================
// SIGNUP
// =====================================

exports.signup = async (req, res) => {

    try {

        console.log("Body:", req.body);
        console.log("File:", req.file);

        const result = await authService.signup(req);

        return res.status(201).json({

            success: true,

            message: "User Registered Successfully",

            data: result

        });

    } catch (error) {

        console.error("Signup Error:", error);

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// VERIFY OTP
// =====================================

exports.verifyOTP = async (req, res) => {

    try {

        console.log("OTP BODY:", req.body);

        const result =
            await authService.verifyOTP(req.body);

        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        console.error("Verify OTP Error:", error);

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// LOGIN
// =====================================

exports.login = async (req, res) => {

    try {

        const result =
            await authService.login(req.body);

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            data: result

        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// REFRESH TOKEN
// =====================================

exports.refreshToken = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {

            return res.status(400).json({

                success: false,

                message: "Refresh Token Required"

            });

        }

        const result =
            await authService.refreshToken(
                refreshToken
            );

        return res.status(200).json({

            success: true,

            message: "Access Token Generated Successfully",

            data: result

        });

    } catch (error) {

        console.error(
            "Refresh Token Error:",
            error
        );

        return res.status(401).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// LOGOUT
// =====================================

exports.logout = async (req, res) => {

    try {

        const result =
            await authService.logout(
                req.user.id
            );

        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        console.error("Logout Error:", error);

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// FORGOT PASSWORD
// =====================================

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Email is required"

            });

        }

        const result =
            await authService.forgotPassword({
                email
            });

        /*
         * OTP email service
         *
         * Agar authService.forgotPassword()
         * already email send karta hai,
         * to yahan email dobara mat bhejna.
         */

        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        console.error(
            "Forgot Password Error:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================
// RESET PASSWORD
// =====================================

exports.resetPassword = async (req, res) => {

    try {

        const {
            email,
            otp,
            newPassword
        } = req.body;


        // Validation

        if (!email || !otp || !newPassword) {

            return res.status(400).json({

                success: false,

                message:
                    "Email, OTP and new password are required"

            });

        }


        if (newPassword.length < 8) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 8 characters"

            });

        }


        const result =
            await authService.resetPassword({

                email,
                otp,
                newPassword

            });


        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        console.error(
            "Reset Password Error:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};