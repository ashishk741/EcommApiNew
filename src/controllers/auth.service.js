// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const generateOTP = require("../utils/generateOtp");
// // const sendOTPEmail = require("../utils/sendMail");

// // exports.signup = async (req) => {
// //   const { name, mobile, email, password } = req.body;

// //   console.log("Body:", req.body);
// //   console.log("Password:", password);

// //   // Validation
// //   if (!name || !mobile || !email || !password) {
// //     throw new Error("All fields are required");
// //   }

// //   // Check Email
// //   const emailExists = await User.findOne({ email });
// //   if (emailExists) {
// //     throw new Error("Email already registered");
// //   }

// //   // Check Mobile
// //   const mobileExists = await User.findOne({ mobile });
// //   if (mobileExists) {
// //     throw new Error("Mobile already registered");
// //   }

// //   // Hash Password
// //   const hashedPassword = await bcrypt.hash(password, 10);
// // const otp = generateOTP();
// // console.log("Generated OTP:", otp);

// // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //   let imageUrl = "";

// //   if (req.file) {
// //     //imageUrl = req.file.originalname;
// //        const uploaded = await uploadImage(req.file.buffer);
// //     imageUrl = uploaded.secure_url;
// //   }

// //   const user = await User.create({
// //     name,
// //     mobile,
// //     email,
// //     password: hashedPassword,
// //     profileImage: imageUrl,
// //     otp,
// //     otpExpiry,
// //     isVerified: false,
// //   });
// //   console.log("Saved User:", user);
// //  await sendOTPEmail(user.email, user.name, otp);
// //  console.log("Email Sent Successfully");
 
// //   return {
// //     id: user._id,
// //     name: user.name,
// //     mobile: user.mobile,
// //     email: user.email,
// //     profileImage: user.profileImage,
// //      isVerified: user.isVerified,
// //   };
// //   //---
// //   exports.verifyOTP = async (data) => {
// //   const { email, otp } = data;

// //   const user = await User.findOne({ email });

// //   if (!user) {
// //     throw new Error("User not found");
// //   }

// //   if (user.isVerified) {
// //     throw new Error("Email already verified");
// //   }

// //   if (user.otp !== otp) {
// //     throw new Error("Invalid OTP");
// //   }

// //   if (new Date() > user.otpExpiry) {
// //     throw new Error("OTP has expired");
// //   }

// //   user.isVerified = true;
// //   user.otp = null;
// //   user.otpExpiry = null;

// //   await user.save();

// //   return {
// //     message: "Email verified successfully",
// //   };
// // };

  
// // };
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const generateOTP = require("../utils/generateOtp");
// const sendOTPEmail = require("../utils/sendMail");
// // const uploadImage = require("../utils/uploadImage");


// exports.signup = async (req) => {

//   const { name, mobile, email, password } = req.body;

//   if (!name || !mobile || !email || !password) {
//     throw new Error("All fields are required");
//   }


//   const emailExists = await User.findOne({ email });

//   if (emailExists) {
//     throw new Error("Email already registered");
//   }


//   const mobileExists = await User.findOne({ mobile });

//   if (mobileExists) {
//     throw new Error("Mobile already registered");
//   }


//   const hashedPassword = await bcrypt.hash(password, 10);


//   const otp = generateOTP();

//   console.log("Generated OTP:", otp);


//   const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);


//   let imageUrl = "";

//   if (req.file) {
//     const uploaded = await uploadImage(req.file.buffer);
//     imageUrl = uploaded.secure_url;
//   }


//   const user = await User.create({

//     name,
//     mobile,
//     email,
//     password: hashedPassword,
//     profileImage: imageUrl,
//     otp,
//     otpExpiry,
//     isVerified:false

//   });


//   await sendOTPEmail(
//     user.email,
//     user.name,
//     otp
//   );


//   return {
//     id:user._id,
//     name:user.name,
//     email:user.email,
//     mobile:user.mobile,
//     profileImage:user.profileImage,
//     isVerified:user.isVerified
//   };

// };



// // OTP VERIFY API SERVICE

// exports.verifyOTP = async (data)=>{

//   const {email, otp} = data;


//   const user = await User.findOne({email});


//   if(!user){
//     throw new Error("User not found");
//   }


//   if(user.isVerified){
//     throw new Error("Email already verified");
//   }


//   if(user.otp != otp){
//     throw new Error("Invalid OTP");
//   }


//   if(new Date() > user.otpExpiry){
//     throw new Error("OTP has expired");
//   }


//   user.isVerified = true;
//   user.otp = null;
//   user.otpExpiry = null;


//   await user.save();


//   return {
//     message:"Email verified successfully"
//   };

// };