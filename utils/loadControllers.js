const path = require('path');
const fs = require('fs');

module.exports = function(dir) {
  const files = fs.readdirSync(dir);
  const result = {};

  files
    .map(file => path.join(dir, file))
    .filter(file => fs.statSync(file).isDirectory())
    .forEach(file => {
      const arr = file.split('\\');
      const controllerName = arr[arr.length - 1];
      const s = `${file}\\${controllerName}Controller.js`;
      const f = path.normalize(s);
      result[[controllerName]] = require(f);
    });

  return result;
};
