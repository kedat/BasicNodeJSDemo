const Joi = require("joi");
const statusCode = require("../constants/statusCode.js");

const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(statusCode.BAD_REQUEST).send({ error: message })
    }
  };
}

module.exports = {
  validateRequestBody
};