const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { handleInvalidMethod } = require("../utils/isAuthenticated");

router
  .route("/register")
  .post(usersController.register)
  .get(handleInvalidMethod)
  .put(handleInvalidMethod)
  .delete(handleInvalidMethod)
  .patch(handleInvalidMethod);

router
  .route("/login")
  .post(usersController.login)
  .get(handleInvalidMethod)
  .put(handleInvalidMethod)
  .delete(handleInvalidMethod)
  .patch(handleInvalidMethod);

module.exports = router;
