const Joi = require('joi');

module.exports.signupSchema = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(255)
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .max(25)
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
  _csrf: Joi.string().required(),
});

module.exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(255)
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .max(50)
    .required(),
});
