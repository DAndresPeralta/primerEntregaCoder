const fs = require("fs");
// const path = require("path");
const path = "carts.json";

const initializerFile = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
};

const saveCartsToFile = (carts) => {
  fs.writeFileSync(path, JSON.stringify(carts, null, 2));
};

const getCartsFromFile = () => {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
};

module.exports = { initializerFile, saveCartsToFile, getCartsFromFile };
