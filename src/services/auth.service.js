const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploadImage = require("../utils/cloudinaryUpload");
const generateOTP = require("../utils/generateOtp");
const sendOTPEmail = require("../utils/sendMail");


// Signup Service
exports.signup = async (req) => {

    const { name, mobile, email, password } = req.body;


    // Validation
    if (!name || !mobile || !email || !password) {
        throw new Error("All fields are required");
    }


    // Check Email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error("Email already registered");
    }


    // Check Mobile
    const mobileExists = await User.findOne({ mobile });

    if (mobileExists) {
        throw new Error("Mobile already registered");
    }



    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);



    // Generate OTP
    const otp = generateOTP();

    const otpExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );


    console.log("Generated OTP:", otp);



    // Cloudinary Image Upload
    let profileImage = "";

    if (req.file) {

        const uploadedImage = await uploadImage(req.file.buffer);

        profileImage = uploadedImage.secure_url;

    }



    // Create User

    const user = await User.create({

        name,
        mobile,
        email,
        password: hashedPassword,
        profileImage,
        otp,
        otpExpiry,
        isVerified: false

    });



    // Send OTP Email

    await sendOTPEmail(
        user.email,
        user.name,
        otp
    );


    return {

        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
        otp:user.otp

    };

};


// Verify OTP Service
exports.verifyOTP = async (data) => {

    const { email, otp } = data;


    const user = await User.findOne({ email });


    if(!user){
        throw new Error("User not found");
    }


    if(user.otp != otp){
        throw new Error("Invalid OTP");
    }


    if(new Date() > user.otpExpiry){
        throw new Error("OTP expired");
    }


    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;


    await user.save();


    return {
        message:"OTP verified successfully"
    };

};

//Login
exports.login = async (data) => {

    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isVerified) {
        throw new Error("Please verify your OTP first");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return {

        accessToken,

        refreshToken,

        user: {

            id: user._id,

            name: user.name,

            email: user.email,

            mobile: user.mobile,

            profileImage: user.profileImage

        }

    };

};

//Refresh
exports.refreshToken = async (token) => {

    if (!token) {
        throw new Error("Refresh Token Required");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.refreshToken !== token) {
        throw new Error("Invalid Refresh Token");
    }

    const accessToken =
        generateAccessToken(user);

    return {
        accessToken
    };

};

//Logout
exports.logout = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.refreshToken = null;

    await user.save();

    return {
        message: "Logout successful"
    };
};