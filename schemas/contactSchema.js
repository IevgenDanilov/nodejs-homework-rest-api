const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string()
    .min(5)
    .max(20)
    // .regex(/^[0-9]{10}$/)
    .regex(/^(?:\d{3}|\(\d{3}\))([-\/\ ])\d{3}([-\/\ ])\d{4}$/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = joiSchema;
