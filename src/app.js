console.log("App.js Loaded");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Ecommerce API Running 🚀"
    });
});

module.exports = app;

// const express = require("express");

// const app = express();

// console.log("App Loaded");

// app.get("/", (req, res) => {
//     console.log("Root Hit");
//     res.send("OK");
// });

// module.exports = app;