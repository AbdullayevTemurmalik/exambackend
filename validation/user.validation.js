const Joi = require("joi");

const registerSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  age: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Parollar bir xil bo'lishi kerak",
  }),
});

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  userName: Joi.string().min(3).max(30).optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  age: Joi.number().integer().min(1).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});

function ValidateRegister(user) {
  return registerSchema.validate(user);
}

function ValidateLogin(user) {
  return loginSchema.validate(user);
}

function ValidateUserUpdate(user) {
  return userUpdateSchema.validate(user);
}

module.exports = {
  ValidateRegister,
  ValidateLogin,
  ValidateUserUpdate,
};
