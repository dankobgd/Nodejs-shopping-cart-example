const path = require('path');
const express = require('express');
const logger = require('morgan');
const mw = require('./middleware/middleware');
const configureViewEngine = require('./config/viewEngine');
const routes = require('./app/routes');

const app = express();

configureViewEngine(app);

app.disable('x-powered-by');
app.use(mw.createSession);
app.use(mw.checkAuthSession);
app.use(mw.setLocals);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes());

app.use(mw.forward404);
app.use(mw.errorHandler);

module.exports = app;
