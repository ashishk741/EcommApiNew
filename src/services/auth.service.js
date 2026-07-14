const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploadImage = require("../utils/cloudinaryUpload");

const signup = async (req) => {

    const { name, mobile, email, password } = req.body;

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImage = "";

    if (req.file) {
        const uploaded = await uploadImage(req.file.buffer);
        profileImage = uploaded.secure_url;
    }

    // Create User
    const user = await User.create({
        name,
        mobile,
        email,
        password: hashedPassword,
        profileImage,
    });

    return {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profileImage: user.profileImage,
    };
};

module.exports = {
    signup,
};