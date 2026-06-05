const Joi = require("joi");
const swiperSchema = Joi.object({
  url: Joi.string().required(),
});
function ValidateSwiper(swiper) { return swiperSchema.validate(swiper); }
module.exports = { ValidateSwiper };
