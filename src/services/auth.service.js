const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (data) => {

    const { name, mobile, email, password } = data;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        mobile,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
    };
};

module.exports = {
    signup,
};