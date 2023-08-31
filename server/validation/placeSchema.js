const Joi = require("joi");

const createPlaceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().integer().min(1000).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  image: Joi.string().required(),
  facilities: Joi.any(),
});

module.exports = {
  createPlaceSchema
};