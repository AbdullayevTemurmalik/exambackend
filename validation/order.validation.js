const Joi = require("joi");
const orderSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  total_amount: Joi.number().precision(2).required(),
  status: Joi.string().valid("pending", "completed", "cancelled").default("pending"),
});
const orderUpdateSchema = Joi.object({
  status: Joi.string().valid("pending", "completed", "cancelled").optional(),
  total_amount: Joi.number().precision(2).optional(),
});
function ValidateOrder(order) { return orderSchema.validate(order); }
function ValidateOrderUpdate(order) { return orderUpdateSchema.validate(order); }
module.exports = { ValidateOrder, ValidateOrderUpdate };
