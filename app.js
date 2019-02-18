const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const middleware = require('./middleware/middleware');
const configureViewEngine = require('./config/viewEngine');

const app = express();

// Use handlebars
configureViewEngine(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Main router
require('./modules/apiRouter')(app);

app.use(middleware.forward404);
app.use(middleware.errorHandler);

module.exports = app;
