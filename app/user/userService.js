const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {signupSchema, loginSchema} = require('./validations');
const knex = require('../../db/connection');

const hashPassword = pw => {
  const saltFactor = 12;
  const salt = bcrypt.genSaltSync(saltFactor);
  const hash = bcrypt.hashSync(pw, salt);
  return hash;
};

const verifyHash = (pw1, pw2) => bcrypt.compareSync(pw1, pw2);

module.exports = {
  validateSignup(data) {
    const result = Joi.validate(data, signupSchema, {abortEarly: false});
    const {value, error} = result;

    if (error) {
      const validationErrors = error.details.map(e => e.message);
      return validationErrors;
    }
  },

  validateSignin(data) {
    const result = Joi.validate(data, loginSchema, {abortEarly: false});
    const {value, error} = result;

    if (error) {
      const validationErrors = error.details.map(e => e.message);
      return validationErrors;
    }
  },

  getOne(email) {
    return knex('users').where('email', email);
  },

  createUser(data) {
    const newUser = {
      email: data.email,
      password: hashPassword(data.password),
    };

    return knex('users').insert(newUser);
  },

  comparePassword(...args) {
    return verifyHash(...args);
  },

  toAuthJSON(data) {
    const withoutPw = {...data[0]};
    delete withoutPw.password;
    return withoutPw;
  },
};
