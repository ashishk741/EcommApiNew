const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require('./config/db');
// Connect Database
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});