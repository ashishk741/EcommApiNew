const dotenv = require("dotenv");
dotenv.config();
require("dotenv").config();

require("dotenv").config();

console.log("EMAIL_FROM =", process.env.EMAIL_FROM);
console.log("BREVO_API_KEY =", process.env.BREVO_API_KEY ? "Loaded" : "Missing");
const cloudinary = require("cloudinary").v2;

cloudinary.config();

const app = require("./app");
const connectDB = require('./config/db');
// Connect Database
connectDB();

const PORT = process.env.PORT || 8000;

console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY);
console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});