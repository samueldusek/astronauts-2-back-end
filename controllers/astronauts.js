const Astronaut = require("../models/Astronaut");

module.exports.getAllAstronauts = async (req, res) => {
  const astronauts = await Astronaut.find();
  res.status(200).json(astronauts);
};

module.exports.getAstronaut = async (req, res) => {
  const { astronautId } = req.params;
  const astronaut = await Astronaut.findById(astronautId);
  res.status(200).json(astronaut);
};

module.exports.addAstronaut = async (req, res) => {
  const astronaut = req.body;
  const newAstronaut = await new Astronaut(astronaut);
  await newAstronaut.save();
  res.status(201).json({ message: "New astronaut added." });
};

module.exports.updateAstronaut = async (req, res) => {
  const { astronautId } = req.params;
  const astronaut = req.body;
  const updatedAstronaut = await Astronaut.findByIdAndUpdate(
    astronautId,
    astronaut,
    {
      useFindAndModify: false,
    }
  );
  res.status(200).json({ message: "Your astronaut has been updated!" });
};

module.exports.deleteAstronaut = async (req, res) => {
  const { astronautId } = req.params;
  const deletedAstronaut = await Astronaut.findByIdAndDelete(astronautId);
  res.status(200).json({ message: "You astronaut has been deleted!" });
};
