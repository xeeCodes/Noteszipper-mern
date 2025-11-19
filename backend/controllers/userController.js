const asyncHandler = require("express-async-handler");
const User = require("../models/Usermodels");
const generateToken = require("../utils/generateToken");

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const user = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      isAdmin: user.isAdmin,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occurred");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {

  console.log("HI! i m from login route");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      isAdmin: user.isAdmin,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password.");
  }
});

module.exports = { registerUser, loginUser };
