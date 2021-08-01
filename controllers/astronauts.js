const Astronaut = require("../models/Astronaut");
const User = require("../models/User");

const { addAstronautValidation } = require("../validations/astronauts");

module.exports.getAllAstronauts = async (req, res) => {
  const { userData } = req;
  try {
    const user = await User.findById(userData.id).populate("astronauts");
    return res.status(200).json(user.astronauts);
  } catch (error) {
    return res.status(500).json({
      error: {
        status: 500,
        message: error._message,
      },
    });
  }
};

module.exports.getAstronaut = async (req, res) => {
  const { userData } = req;
  const { astronautId } = req.params;

  try {
    const user = await User.findById(userData.id).populate("astronauts");
    const usersAstronaut = user.astronauts.find(
      (astronaut) => astronaut._id == astronautId
    );

    if (usersAstronaut) return res.status(200).json(usersAstronaut);

    return res.status(404).json({
      error: {
        status: 404,
        message: "Astronaut not found.",
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

module.exports.addAstronaut = async (req, res) => {
  const { userData } = req;
  const astronaut = req.body;

  const { error } = addAstronautValidation(astronaut);
  if (error) {
    return res.status(400).json({
      error: {
        status: 400,
        message: error.details[0].message,
      },
    });
  }

  const newAstronaut = new Astronaut(astronaut);
  try {
    await newAstronaut.save();
    const user = await User.findById(userData.id);
    user.astronauts.push(newAstronaut);
    await user.save();
    return res.status(201).json({
      success: {
        message: "New astronaut added.",
      },
      astronaut: {
        ...newAstronaut._doc,
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

module.exports.updateAstronaut = async (req, res) => {
  const { userData } = req;
  const { astronautId } = req.params;
  const astronaut = req.body;

  const { error } = addAstronautValidation(astronaut);
  if (error) {
    return res.status(400).json({
      error: {
        status: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const user = await User.findById(userData.id).populate("astronauts");
    const usersAstronaut = user.astronauts.find(
      (astronaut) => astronaut._id == astronautId
    );
    if (usersAstronaut) {
      const updatedAstronaut = await Astronaut.findByIdAndUpdate(
        astronautId,
        astronaut,
        {
          useFindAndModify: false,
        }
      );
      return res.status(200).json({
        success: {
          message: "Astronaut has been updated.",
        },
        astronaut: {
          _id: astronautId,
          ...astronaut,
        },
      });
    } else {
      return res.status(404).json({
        error: {
          status: 404,
          message: "Astronaut not found.",
        },
      });
    }
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

module.exports.deleteAstronaut = async (req, res) => {
  const { userData } = req;
  const { astronautId } = req.params;
  try {
    const user = await User.findById(userData.id).populate("astronauts");
    const usersAstronaut = user.astronauts.find(
      (astronaut) => astronaut._id == astronautId
    );
    if (usersAstronaut) {
      const deletedAstronaut = await Astronaut.findByIdAndDelete(astronautId);
      return res.status(200).json({
        success: {
          message: "Astronaut deleted.",
        },
      });
    } else {
      return res.status(404).json({
        error: {
          status: 404,
          message: "Astronaut not found.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        status: 500,
        message: error._message,
      },
    });
  }
};
