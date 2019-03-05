const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const helpers = require('./handlebars/helpers');

hbs.registerHelper(helpers);

function compileTemplate(templateName, data = {}) {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
    fs.readFile(templatePath, 'utf-8', (err, source) => {
      if (err) {
        return reject(err);
      }

      const compiled = hbs.compile(source)(data);
      resolve(compiled);
    });
  });
}

module.exports = compileTemplate;
