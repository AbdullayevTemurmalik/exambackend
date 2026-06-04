const Joi = require("joi");
const likeSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
});
function ValidateLike(like) { return likeSchema.validate(like); }
module.exports = { ValidateLike };
