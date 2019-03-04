const Joi = require('joi');

const signupSchema = Joi.object().keys({
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

const loginSchema = Joi.object().keys({
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

const forgotSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  _csrf: Joi.string().required(),
});

const resetSchema = Joi.object().keys({
  password: Joi.string()
    .min(3)
    .max(25)
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
  _csrf: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  forgotSchema,
  resetSchema,
};
