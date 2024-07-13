const fs = require("fs");
// const path = require("path");
const path = "products.json";

const initializerFile = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
};

const saveProductsToFile = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
};

const getProductsFromFile = () => {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
};

const validateFields = (products) => {
  if (
    products.title === undefined ||
    products.description === undefined ||
    products.code === undefined ||
    products.price === undefined ||
    products.stock < 0 ||
    products.category === undefined
  ) {
    return false;
  }
  return true;
};

module.exports = {
  initializerFile,
  saveProductsToFile,
  getProductsFromFile,
  validateFields,
};
