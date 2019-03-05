const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

function compileTemplate(templateName, data = {}) {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(__dirname, `${templateName}.hbs`);
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
