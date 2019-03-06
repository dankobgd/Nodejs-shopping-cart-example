const createError = require('http-errors');
const csurf = require('csurf');
const session = require('express-session');
const config = require('../config');
const knex = require('../db/connection');
const UserService = require('../app/user/userService');

//  Catch 404 and forward to error handler
module.exports.forward404 = (req, res, next) => {
  next(createError(404));
};

//  Error handler
module.exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
};

module.exports.setLocals = (req, res, next) => {
  res.locals.successMessage = req.session.successMessage;
  res.locals.infoMsg = req.session.infoMsg;
  delete req.session.successMessage;
  delete req.session.infoMsg;
  res.locals.isAuthenticated = Boolean(req.user);
  res.locals.session = req.session;
  next();
};

// Async handler catch errors wrapper
module.exports.catchErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

//  Create session
module.exports.createSession = session({
  name: config.session.name,
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  cookie: {
    secure: config.session.secure,
    maxAge: config.session.maxAge,
    expires: config.session.expires,
  },
});

//  Session check
module.exports.checkAuthSession = async (req, res, next) => {
  if (!(req.session && req.session.userId)) {
    return next();
  }

  try {
    const user = await knex('users').where('id', req.session.userId);

    if (!user) {
      return next();
    }

    const userData = UserService.toAuthJSON(user);
    req.user = userData;
    res.locals.user = userData;
    next();
  } catch (err) {
    return next(err);
  }
};

// Redirect non-authenticated user
module.exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signin');
  }
  next();
};

// Redirect authenticated user
module.exports.redirectAuthed = (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  next();
};

// CSRF protection
module.exports.csrf = (req, res, next) => csurf();
