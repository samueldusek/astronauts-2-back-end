const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const userValidation = require("../validations/users");

module.exports.register = async (req, res) => {
  const userData = req.body;

  // Check if user data is valid
  const { error } = userValidation.registerValidation(userData);
  if (error) {
    return res.status(400).json({
      error: {
        status: 400,
        message: error.details[0].message,
      },
    });
  }

  // Check if provided email is unique
  const existingEmailUser = await User.findOne({ email: userData.email });
  if (existingEmailUser) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "The email is already taken. Provide different email.",
      },
    });
  }

  // Check if provided username is unique
  const existingUsernameUser = await User.findOne({
    username: userData.username,
  });
  if (existingUsernameUser) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "The username is already taken. Provide different username.",
      },
    });
  }

  // Use bcrypt to hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = new User({
    username: userData.username,
    email: userData.email,
    hashedPassword: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      success: {
        status: 201,
        message: "User with following information was created.",
      },
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        status: 500,
        message: error._message,
      },
    });
  }
};

module.exports.login = async (req, res) => {
  const userData = req.body;

  // Check if user data is valid
  const { error } = userValidation.loginValidation(userData);
  if (error) {
    return res.status(400).json({
      error: {
        status: 400,
        message: error.details[0].message,
      },
    });
  }

  // Check if user with provided username exists
  const user = await User.findOne({ username: userData.username });
  if (!user) {
    return res.status(404).json({
      error: {
        status: 404,
        message: "User does not exist.",
      },
    });
  }

  // Check if password is correct for given user
  const isAuthenticated = await bcrypt.compare(
    userData.password,
    user.hashedPassword
  );
  if (isAuthenticated) {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 3600,
    });
    return res
      .status(200)
      .header("jwtToken", jwtToken)
      .json({
        success: {
          status: 200,
          message: "You are logged in.",
        },
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  }

  res.status(401).json({
    error: {
      status: 401,
      message: "The password or the username is incorrect.",
    },
  });
};
