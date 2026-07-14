

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
module.exports = router;


// app.get("/", (req, res) => {
//     console.log("Root API Hit");
//     res.json({
//         success: true,
//         message: "Ecommerce API Running 🚀"
//     });
// });