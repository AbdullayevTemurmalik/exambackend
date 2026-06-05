const Joi = require("joi");
const cartSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  card_id: Joi.number().integer().required(),
});
function ValidateCart(cart) { return cartSchema.validate(cart); }
module.exports = { ValidateCart };
