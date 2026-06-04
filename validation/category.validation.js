const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow(""),
});

const categoryUpdateSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  description: Joi.string().allow("").optional(),
});

function ValidateCategory(category) {
  return categorySchema.validate(category);
}

function ValidateCategoryUpdate(category) {
  return categoryUpdateSchema.validate(category);
}

module.exports = { ValidateCategory, ValidateCategoryUpdate };
