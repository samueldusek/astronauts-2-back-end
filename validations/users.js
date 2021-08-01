const Joi = require("joi");

module.exports.registerValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),

    password: Joi.string().min(5).required(),

    passwordConfirmation: Joi.ref("password"),

    email: Joi.string().email().required(),
  });
  return schema.validate(user);
};
