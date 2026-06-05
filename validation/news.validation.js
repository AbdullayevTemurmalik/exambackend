const Joi = require("joi");
const newsSchema = Joi.object({
  url: Joi.string().required(),
});
function ValidateNews(news) { return newsSchema.validate(news); }
module.exports = { ValidateNews };
