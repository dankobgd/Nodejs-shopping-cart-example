const createError = require('http-errors');
const csurf = require('csurf');
const session = require('express-session');
const config = require('../config');

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

// Async handler catch errors wrapper
module.exports.catchErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

//  Create session
module.exports.createSession = session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: 3600000, expires: new Date(Date.now() + 3600000)},
});

//  Session check
module.exports.checkSession = (req, res, next) => {
  // if (!(req.session && req.session.userId)) {
  //   return next();
  // }
  // User.findById(req.session.userId, (err, user) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (!user) {
  //     return next();
  //   }
  //   user.password = undefined;
  //   req.user = user;
  //   res.locals.user = user;
  //   next();
  // });
};

//  Require login
module.exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signin');
  }
  next();
};

// CSRF protection
module.exports.csrf = (req, res, next) => csurf();
