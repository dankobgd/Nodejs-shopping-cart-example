module.exports = {
  section(name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
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
};
