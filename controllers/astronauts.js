const Astronaut = require("../models/astronauts");

module.exports.sendAllAstronauts = async (req, res) => {
  const astronauts = await Astronaut.find();
  res.json(astronauts);
};
