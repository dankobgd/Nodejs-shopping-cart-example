const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('../utils/handlebars/helpers');

module.exports = app => {
  app.engine(
    'hbs',
    exphbs({
      extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: path.join(__dirname, '../views/layouts'),
      partialsDir: path.join(__dirname, '../views/partials'),
      helpers,
    })
  );

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');
};
