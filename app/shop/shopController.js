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
