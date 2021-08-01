const User = require("../models/User");

module.exports.register = async (req, res) => {
  res.send("You are registered!");
};

module.exports.login = async (req, res) => {
  res.send("You are logged in!");
};
