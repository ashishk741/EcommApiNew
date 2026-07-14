const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req) => {
  const { name, mobile, email, password } = req.body;

  console.log("Body:", req.body);
  console.log("Password:", password);

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

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  let imageUrl = "";

  if (req.file) {
    imageUrl = req.file.originalname;
  }

  const user = await User.create({
    name,
    mobile,
    email,
    password: hashedPassword,
    profileImage: imageUrl,
  });

  return {
    id: user._id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    profileImage: user.profileImage,
  };
};