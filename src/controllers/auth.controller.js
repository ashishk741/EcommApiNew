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