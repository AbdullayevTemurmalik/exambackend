const Joi = require("joi");
const categorySchema = Joi.object({
  name: Joi.string().required(),
});
function ValidateCategory(category) { return categorySchema.validate(category); }
module.exports = { ValidateCategory };
