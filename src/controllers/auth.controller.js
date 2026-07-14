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
/*const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const result = await authService.signup(req);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};*/

// const authService = require("../services/auth.service");

// const signup = async (req, res) => {
//     try {
//         const result = await authService.signup(req.body);

//         res.status(201).json({
//             success: true,
//             message: "User registered successfully",
//             data: result,
//         });

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// module.exports = {
//     signup,
// };
