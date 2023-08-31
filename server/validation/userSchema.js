const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).alphanum().required(),
  isAdmin: Joi.boolean().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).alphanum().required(),
});

module.exports = {
  registerSchema, loginSchema
};