const Joi = require("joi");
const registerSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
function ValidateRegister(user) { return registerSchema.validate(user); }
function ValidateLogin(user) { return loginSchema.validate(user); }
module.exports = { ValidateRegister, ValidateLogin };
