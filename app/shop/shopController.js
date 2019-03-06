const ShopService = require('./shopService');
const Cart = require('./cart');
const config = require('../../config/');

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

  if (!req.user) {
    req.session.infoMsg = 'You successfuly added item to cart, please log in so you can see cart and checkout';
  }

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

module.exports.charge = async (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }

  const cart = new Cart(req.session.cart);
  const stripe = require('stripe')(config.stripe.secret);

  try {
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    });

    const charge = await stripe.charges.create({
      amount: cart.stripeAmmount,
      currency: 'usd',
      description: 'Example charge',
      customer: customer.id,
    });

    const order = {
      chargeAmount: charge.amount,
      chargeToken: charge.id,
      receiptUrl: charge.receipt_url,
      userId: req.user.id,
      ...req.body,
    };

    const orderId = await ShopService.addOrder(order);

    const cartList = cart.getItemsList().map(obj => ({
      orderId: orderId[0],
      productId: obj.item.id,
      quantity: obj.quantity,
    }));

    await ShopService.addOrderedCartItems(cartList);
  } catch (err) {
    console.error('Stripe Error: ', err);
  }

  cart.clearCart();
  req.session.cart = null;
  req.session.successMessage = 'Payment successful!';
  res.redirect('/profile');
};
