const UserService = require('./userService');

// Show register page
module.exports.getSignup = async (req, res, next) => {
  res.render('user/signup', {title: 'signup', csrfToken: req.csrfToken()});
};

// Show sign in page
module.exports.getSignin = async (req, res, next) => {
  res.render('user/signin', {title: 'signin'});
};

// Show profile page
module.exports.getProfile = async (req, res, next) => {
  const originalOrders = await UserService.getOrderedItems(req.user.id);
  const orders = [];

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

// Post sign up page
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

// Post Sign In page
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
