class Cart {
  constructor({items = {}, totalQuantity = 0, totalPrice = 0} = {}) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  get stripeAmmount() {
    return this.totalPrice * 100
  }

  addItem(item, id) {
    if (!this.items[id]) {
      this.items[id] = {item, quantity: 0, price: 0};
    }

    this.items[id].quantity += 1;
    this.items[id].price = this.items[id].item.price * this.items[id].quantity;
    this.totalQuantity += 1;
    this.totalPrice += this.items[id].item.price;
  }

  addOne(id) {
    this.items[id].quantity += 1;
    this.items[id].price += this.items[id].item.price;
    this.totalQuantity += 1;
    this.totalPrice += this.items[id].item.price;
  }

  removeOne(id) {
    this.items[id].quantity -= 1;
    this.items[id].price -= this.items[id].item.price;
    this.totalQuantity -= 1;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  }

  removeAll(id) {
    this.totalQuantity -= this.items[id].quantity;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  }

  clearCart() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    delete this.items;
  }

  getItemsList() {
    return Object.keys(this.items).map(key => this.items[key]);
  }
}

module.exports = Cart;
