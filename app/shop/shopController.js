const ShopService = require('./shopService');
const Cart = require('./cart');

module.exports.get = async (req, res, next) => {
  const productsList = await ShopService.getProducts();

  const productChunks = [];
  const chunkSize = 3;

  for (let i = 0; i < productsList.length; i += chunkSize) {
    productChunks.push(productsList.slice(i, i + chunkSize));
  }

  res.render('shop/index', {products: productChunks});
};

module.exports.getAddToCart = async (req, res, next) => {
  const {productId} = req.params;
  const cart = new Cart(req.session.cart);

  const product = await ShopService.getProductById(productId);

  cart.addItem(product[0], product[0].id);
  req.session.cart = cart;
  res.redirect('/');
};

module.exports.getShoppingCart = async (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {title: 'Shopping Cart', products: null});
  }

  const cart = new Cart(req.session.cart);

  res.render('shop/shopping-cart', {
    title: 'Shopping Cart',
    products: cart.getItemsList(),
    totalPrice: cart.totalPrice,
    totalQuantity: cart.totalQuantity,
  });
};

module.exports.addOne = (req, res, next) => {
  const {productId} = req.params;
  const cart = new Cart(req.session.cart);
  cart.addOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

module.exports.removeOne = (req, res, next) => {
  const {productId} = req.params;
  const cart = new Cart(req.session.cart);
  cart.removeOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

module.exports.removeAll = (req, res, next) => {
  const {productId} = req.params;
  const cart = new Cart(req.session.cart);
  cart.removeAll(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

module.exports.clearCart = (req, res, next) => {
  const cart = new Cart(req.session.cart);
  cart.clearCart();
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

module.exports.getCheckout = (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }

  const cart = new Cart(req.session.cart);

  res.render('shop/checkout', {title: 'Checkout', csrfToken: req.csrfToken(), totalPrice: cart.totalPrice});
};

module.exports.postCheckout = (req, res, next) => {
  console.log(req.body);
};
