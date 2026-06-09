const Joi = require("joi");
const newsSchema = Joi.object({
  url: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
});
function ValidateNews(news) { return newsSchema.validate(news); }
module.exports = { ValidateNews };
