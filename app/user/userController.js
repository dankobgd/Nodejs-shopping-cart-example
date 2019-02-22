module.exports.getSignup = async (req, res, next) => {
  res.render('user/signup', {title: 'signup'});
};

module.exports.getSignin = async (req, res, next) => {
  res.render('user/signin', {title: 'signin'});
};
