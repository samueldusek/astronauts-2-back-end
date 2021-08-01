const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const {
  isAuthenticated,
  handleInvalidMethod,
} = require("../utils/isAuthenticated");

router
  .route("/")
  .get(isAuthenticated, astronautsController.getAllAstronauts)
  .post(isAuthenticated, astronautsController.addAstronaut)
  .put(handleInvalidMethod)
  .delete(handleInvalidMethod)
  .patch(handleInvalidMethod);

router
  .route("/:astronautId")
  .get(isAuthenticated, astronautsController.getAstronaut)
  .put(isAuthenticated, astronautsController.updateAstronaut)
  .delete(isAuthenticated, astronautsController.deleteAstronaut)
  .post(handleInvalidMethod)
  .patch(handleInvalidMethod);

module.exports = router;
