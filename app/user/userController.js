const stream = require('stream');
const UserService = require('./userService');

// GET register page
module.exports.getSignup = async (req, res, next) => {
  res.render('user/signup', {title: 'signup', csrfToken: req.csrfToken()});
};

// GET sign in page
module.exports.getSignin = async (req, res, next) => {
  res.render('user/signin', {title: 'signin'});
};

// GET profile page
module.exports.getProfile = async (req, res, next) => {
  const originalOrders = await UserService.getOrderedItems(req.user.id);
  const orders = [];

  /* eslint no-param-reassign: "off" */
  originalOrders.forEach(
    (function(hash) {
      return function(a) {
        if (!hash[a.id]) {
          hash[a.id] = {
            id: a.id,
            totalPrice: a.totalPrice,
            token: a.token,
            receiptUrl: a.receiptUrl,
            orderDate: a.created_at,
            items: [],
          };
          orders.push(hash[a.id]);
        }
        hash[a.id].items.push({title: a.title, price: a.price, quantity: a.quantity, combined: a.combined});
      };
    })(Object.create(null))
  );

  res.render('user/profile', {
    title: 'profile',
    orders,
  });
};

// POST sign up page
module.exports.postSignup = async (req, res, next) => {
  const validationErrors = UserService.validateSignup(req.body);
  if (validationErrors) {
    return res.render('user/signup', {title: 'signup', validationErrors});
  }

  const user = await UserService.getOne(req.body.email);
  if (user.length) {
    return res.render('user/signup', {authError: 'The email is already taken, please try another one'});
  }

  try {
    await UserService.createUser(req.body);
  } catch (err) {
    return res.render('user/signup', {authError: 'Authentication error, please try again'});
  }

  req.session.successMessage = 'Account created, you can now log in';
  res.redirect('/signin');
};

// POST Sign In page
module.exports.postSignin = async (req, res, next) => {
  const validationErrors = UserService.validateSignin(req.body);
  if (validationErrors) {
    return res.render('user/signin', {title: 'signin', validationErrors});
  }

  const user = await UserService.getOne(req.body.email);

  if (!user.length) {
    return res.render('user/signin', {authError: "User with this email doesn't exist"});
  }

  if (!UserService.comparePassword(req.body.password, user[0].password)) {
    return res.render('user/signin', {authError: 'Password is incorrect'});
  }

  req.session.userId = user[0].id;
  req.session.successMessage = 'Successful login';
  res.redirect('/');
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

// GET forgot password
module.exports.getForgotPassword = async (req, res, next) => {
  res.render('user/forgotPassword', {title: 'forgot password', csrfToken: req.csrfToken()});
};

// POST forgot password
module.exports.postForgotPassword = async (req, res, next) => {
  const validationErrors = UserService.validateForgot(req.body);
  if (validationErrors) {
    return res.render('user/forgotPassword', {title: 'forgot password', validationErrors});
  }

  const user = await UserService.getOne(req.body.email);

  if (!user.length) {
    return res.render('user/forgotPassword', {
      title: 'forgot password',
      accountError: 'No account with this e-mail can be found.',
    });
  }

  const resetToken = await UserService.generateResetToken();
  const ret = await UserService.updateResetToken(req.body.email, resetToken);

  const emailOpts = {
    template: 'resetPassword',
    hostUrl: req.headers.host,
    token: resetToken,
    email: ret.email,
  };

  await UserService.sendResetPasswordEmail(emailOpts);
  req.session.successMessage = `E-mail sent to: ${ret.email}`;
  res.redirect('/forgot');
};

// GET reset password
module.exports.getResetPassword = async (req, res, next) => {
  const {token} = req.params;
  const user = await UserService.verifyResetToken(token);

  if (!user.length) {
    return res.render('user/resetPassword', {
      title: 'reset password',
      accountError: 'Password reset token is invalid or has expired.',
      csrfToken: req.csrfToken(),
      token,
    });
  }

  res.render('user/resetPassword', {title: 'reset password', csrfToken: req.csrfToken(), token});
};

// POST reset password
module.exports.postResetPassword = async (req, res, next) => {
  const validationErrors = UserService.validateReset(req.body);
  if (validationErrors) {
    return res.render('user/resetPassword', {validationErrors, token: req.params.token});
  }

  const user = await UserService.verifyResetToken(req.params.token);

  if (!user.length) {
    return res.render('user/resetPassword', {
      accountError: 'Password reset token is invalid or has expired.',
      token: req.params.token,
    });
  }

  const ret = await UserService.setNewPassword(req.params.token, req.body.password);

  const emailOpts = {
    template: 'resetConfirm',
    hostUrl: req.headers.host,
    email: ret.email,
  };

  await UserService.sendResetPasswordConfirmationEmail(emailOpts);
  req.session.successMessage = `Password successfuly changed for the account: ${ret.email}`;
  res.redirect('/signin');
};

// GET generate PDF
module.exports.generatePdf = async (req, res, next) => {
  const pdf = await UserService.generateOrdersPdf();
  const filename = 'orders.pdf';
  const readStream = new stream.PassThrough();

  readStream.end(pdf);
  res.set('Content-disposition', `attachment; filename=${filename}`);
  res.set('Content-Type', 'application/pdf');
  readStream.pipe(res);
};
