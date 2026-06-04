const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().required(),
  imageUrl: Joi.string().allow("", null).optional(),
  manufactureDate: Joi.date().optional().allow(null),
  category_id: Joi.number().integer().optional().allow(null),
});

const productUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().optional(),
  imageUrl: Joi.string().allow("", null).optional(),
  manufactureDate: Joi.date().optional().allow(null),
  category_id: Joi.number().integer().optional().allow(null),
});

function ValidateProduct(product) {
  return productSchema.validate(product);
}

function ValidateProductUpdate(product) {
  return productUpdateSchema.validate(product);
}

module.exports = { ValidateProduct, ValidateProductUpdate };
