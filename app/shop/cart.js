class Cart {
  constructor({items = {}, totalQuantity = 0, totalPrice = 0} = {}) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
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

  getItemsList() {
    return Object.keys(this.items).map(key => this.items[key]);
  }
}

module.exports = Cart;
