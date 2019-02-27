module.exports = {
  block(name) {
    const blocks = this._blocks;
    const content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  },
  contentFor(name, options) {
    const blocks = this._blocks || (this._blocks = {});
    const block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  },
  truncate(length, text) {
    const words = text.split(' ');
    let newText = text;
    if (words.length > length) {
      newText = '';
      for (let i = 0; i <= length; i += 1) {
        newText += `${words[i]} `;
      }
      newText = `${newText.trim()}...`;
    }
    return newText;
  },
  formatPrice(price) {
    return price.toFixed(2);
  },
  stripeAmmount(val) {
    return val * 100;
  },
  debug(ctx) {
    return JSON.stringify(ctx, null, 2);
  },
};
