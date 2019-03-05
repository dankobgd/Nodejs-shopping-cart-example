const Joi = require('joi');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');
const {signupSchema, loginSchema, forgotSchema, resetSchema} = require('./validations');
const mailer = require('../../services/mailer');
const knex = require('../../db/connection');
const compileTemplate = require('../../utils/compileTemplate');

function hashPassword(pw) {
  const saltFactor = 12;
  const salt = bcrypt.genSaltSync(saltFactor);
  const hash = bcrypt.hashSync(pw, salt);
  return hash;
}

function verifyHash(pw1, pw2) {
  return bcrypt.compareSync(pw1, pw2);
}

function generateToken({stringBase = 'hex', byteLength = 20} = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}

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

  validateForgot(data) {
    const result = Joi.validate(data, forgotSchema, {abortEarly: false});
    const {value, error} = result;

    if (error) {
      const validationErrors = error.details.map(e => e.message);
      return validationErrors;
    }
  },

  validateReset(data) {
    const result = Joi.validate(data, resetSchema, {abortEarly: false});
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

  getOrderedItems(id) {
    return knex.raw(
      `
      SELECT p.title,
            c.quantity,
            p.price,
            (p.price * c.quantity) AS combined,
            o.chargeToken AS token,
            o.chargeAmount AS totalPrice,
            o.id,
            o.receiptUrl,
            o.created_at
      FROM users u
            INNER JOIN
            orders o ON u.id = o.userId
            INNER JOIN
            cartList c ON o.id = c.orderId
            INNER JOIN
            products p ON c.productId = p.id
      WHERE u.id = ?
      ORDER BY o.created_at DESC;`,
      [id]
    );
  },

  getSpecificOrders(userId, orderId) {
    return knex.raw(
      `
      SELECT p.title,
            c.quantity,
            p.price,
            (p.price * c.quantity) AS combined,
            o.chargeToken AS token,
            o.chargeAmount AS totalPrice,
            o.id,
            o.receiptUrl,
            o.created_at
      FROM users u
            INNER JOIN
            orders o ON u.id = o.userId
            INNER JOIN
            cartList c ON o.id = c.orderId
            INNER JOIN
            products p ON c.productId = p.id
      WHERE u.id = ? AND
            o.id = ?
      ORDER BY o.created_at DESC;`,
      [userId, orderId]
    );
  },

  async updateResetToken(email, token) {
    await knex('users')
      .where('email', email)
      .update({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000}) // 1 hour
      .returning('id');

    return knex('users')
      .select('email')
      .where('email', email)
      .first();
  },

  async setNewPassword(token, pw) {
    const email = await knex('users')
      .select('email')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '<', knex.fn.now())
      .first();

    await knex('users')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '<', knex.fn.now())
      .update({password: hashPassword(pw), resetPasswordToken: null, resetPasswordExpires: null});

    return email;
  },

  verifyResetToken(token) {
    return knex('users')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '<', knex.fn.now());
  },

  async generateResetToken() {
    return generateToken();
  },

  sendResetPasswordEmail(obj) {
    return mailer.send(obj);
  },

  sendResetPasswordConfirmationEmail(obj) {
    return mailer.send(obj);
  },

  async generateOrdersPdf(ordersContext) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const ordersHTML = await compileTemplate('orders-pdf', ordersContext);

      await page.setContent(ordersHTML);
      await page.emulateMedia('screen');
      const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      return buffer;
    } catch (err) {
      console.log('err: ', err);
      throw err;
    }
  },

  transformOrdersForDisplay(arr) {
    const orders = [];

    /* eslint no-param-reassign: "off" */
    arr.forEach(
      (function(hashMap) {
        return function(item) {
          if (!hashMap[item.id]) {
            hashMap[item.id] = {
              id: item.id,
              totalPrice: item.totalPrice,
              token: item.token,
              receiptUrl: item.receiptUrl,
              orderDate: item.created_at,
              items: [],
            };
            orders.push(hashMap[item.id]);
          }
          hashMap[item.id].items.push({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            combined: item.combined,
          });
        };
      })(Object.create(null))
    );

    return orders;
  },
};
