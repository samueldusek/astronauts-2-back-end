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

  const newUser = new User({
    username: userData.username,
    email: userData.email,
    hashedPassword: userData.password,
  });

  try {
    await newUser.save();
    console.log(newUser);
    return res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        status: 500,
        message: error._message,
      },
    });
  }
};

module.exports.login = async (req, res) => {
  res.send("You are logged in!");
};
