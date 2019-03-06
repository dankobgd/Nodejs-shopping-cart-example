const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const config = require('../config/');
const compileTemplate = require('../utils/compileTemplate');

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

const generateHTML = async (templateName, context = {}) => {
  const compiledTemplate = await compileTemplate(templateName, context);
  const inlined = juice(compiledTemplate);
  return inlined;
};

module.exports.send = async opts => {
  const html = await generateHTML(opts.template, opts);
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
