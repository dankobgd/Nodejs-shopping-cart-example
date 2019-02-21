module.exports.getSignup = async (req, res, next) => {
  res.render('user/signup', {title: 'signup'});
};
