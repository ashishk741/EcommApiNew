require("dotenv").config();

const express = require("express");
const app = express();

const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
//const authMiddleware = require("../middlewares/auth.middleware");

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
 //app = require("./app");
app.use("/api/v1/auth", authRoutes);



console.log("EMAIL_FROM =", process.env.EMAIL_FROM);
console.log("BREVO_API_KEY =", process.env.BREVO_API_KEY ? "Loaded" : "Missing");
const cloudinary = require("cloudinary").v2;

cloudinary.config();

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