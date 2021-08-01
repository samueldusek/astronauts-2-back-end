const Joi = require("joi");

module.exports.addAstronautValidation = (astronautData) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(1).max(30).required(),

    lastName: Joi.string().alphanum().min(1).max(30).required(),

    birthday: Joi.date().required(),

    superpower: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(astronautData);
};
