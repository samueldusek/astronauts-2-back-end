const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const isAuthenticated = require("../utils/isAuthenticated");

router
  .route("/")
  .get(isAuthenticated, astronautsController.getAllAstronauts)
  .post(astronautsController.addAstronaut);

router
  .route("/:astronautId")
  .get(astronautsController.getAstronaut)
  .put(astronautsController.updateAstronaut)
  .delete(astronautsController.deleteAstronaut);

module.exports = router;
