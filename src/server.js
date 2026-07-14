const dotenv = require("dotenv");
dotenv.config();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config();

const app = require("./app");
const connectDB = require('./config/db');
// Connect Database
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});