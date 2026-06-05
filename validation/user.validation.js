const Joi = require("joi");

const registerSchema = Joi.object({
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  age: Joi.number().integer().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

function ValidateRegister(user) { return registerSchema.validate(user); }
function ValidateLogin(user) { return loginSchema.validate(user); }

module.exports = { ValidateRegister, ValidateLogin };
