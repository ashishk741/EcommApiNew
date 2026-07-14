const authService = require("../services/auth.service");
exports.signup = async (req, res) => {
    console.log("Body:", req.body);
    console.log("File:", req.file);
  console.log("Signup API Hit");
    console.log(req.body);
    try {
        //const result = await authService.signup(req);
const result = await authService.signup(req);


        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: result,
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
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
