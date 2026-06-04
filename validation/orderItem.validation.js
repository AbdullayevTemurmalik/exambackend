const Joi = require("joi");
const orderItemSchema = Joi.object({
  order_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).required(),
});
const orderItemUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional(),
  price: Joi.number().precision(2).optional(),
});
function ValidateOrderItem(item) { return orderItemSchema.validate(item); }
function ValidateOrderItemUpdate(item) { return orderItemUpdateSchema.validate(item); }
module.exports = { ValidateOrderItem, ValidateOrderItemUpdate };
