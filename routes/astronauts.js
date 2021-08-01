const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const isAuthenticated = require("../utils/isAuthenticated");

router
  .route("/")
  .get(isAuthenticated, astronautsController.getAllAstronauts)
  .post(isAuthenticated, astronautsController.addAstronaut);

router
  .route("/:astronautId")
  .get(isAuthenticated, astronautsController.getAstronaut)
  .put(isAuthenticated, astronautsController.updateAstronaut)
  .delete(isAuthenticated, astronautsController.deleteAstronaut);

module.exports = router;
