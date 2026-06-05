const Joi = require("joi");
const productSchema = Joi.object({
  image: Joi.string().optional(),
  price: Joi.number().integer().required(),
  description: Joi.string().optional(),
  category_id: Joi.number().integer().required(),
  discount: Joi.number().integer().optional(),
  stars: Joi.number().integer().optional(),
});
function ValidateProduct(product) { return productSchema.validate(product); }
module.exports = { ValidateProduct };
