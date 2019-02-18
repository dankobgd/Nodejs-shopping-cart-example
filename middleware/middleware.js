const createError = require('http-errors');

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
