const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const config = require('../config/');

const transport = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateHTML = (template, context = {}) => {
  const templatePath = path.join(__dirname, 'templates', `${template}.hbs`);
  const source = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(source);
  const withContext = compiledTemplate(context);
  const inlined = juice(withContext);
  return inlined;
};

module.exports.send = async opts => {
  const html = generateHTML(opts.template, opts);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `Node Shopping Cart <${config.email.from}>`,
    to: opts.email,
    subject: opts.subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err);
      }
      return resolve(info);
    });
  });
};
