const Joi = require("joi");
const cartSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).default(1),
});
const cartUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional(),
});
function ValidateCart(cart) { return cartSchema.validate(cart); }
function ValidateCartUpdate(cart) { return cartUpdateSchema.validate(cart); }
module.exports = { ValidateCart, ValidateCartUpdate };
