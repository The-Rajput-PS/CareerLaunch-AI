const bcrypt = require("bcrypt");

const User = require("../models/User");

const { generateToken } = require("../utils/jwt");

// ==========================================
// Register User
// ==========================================

const registerUser = async (userData) => {
  const { email, password } = userData;

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save User
  const user = await User.create({
    ...userData,

    password: hashedPassword,
  });

  return {
    id: user._id,

    name: user.name,

    email: user.email,

    targetCompany: user.targetCompany,
  };
};

// ==========================================
// Login User
// ==========================================

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      targetCompany: user.targetCompany,
    },
  };
};
module.exports = {
  registerUser,

  loginUser,
};
