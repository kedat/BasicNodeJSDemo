const Joi = require("joi");

const bookAVisitSchema = Joi.object({
  placeId: Joi.string().required(),
  date: Joi.date().required().greater(Date.now())
});

module.exports = {
  bookAVisitSchema
};