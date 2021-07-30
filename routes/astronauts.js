const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");

router.route("/").get(astronautsController.sendAllAstronauts);

module.exports = router;
