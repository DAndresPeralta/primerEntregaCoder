const express = require("express");
const router = express.Router();
const {
  initializerFile,
  saveProductsToFile,
  getProductsFromFile,
} = require("../utils/products.utils.js");

initializerFile();

router.get("/products", (req, res) => {
  const { limit } = req.query;
  const data = getProductsFromFile();
  const productLimit = data.find((p) => p.id <= limit);
  if (!limit) {
    res.status(200).json(data);
  } else if (limit) {
    res.status(200).json(productLimit);
  } else {
    res.status(400).json({ msg: "Producto no encontrado" });
  }
});

router.get("/products/:id", (req, res) => {
  const pid = parseInt(req.params.id);
  const newData = getProductsFromFile();
  const productId = newData.find((p) => p.id === pid);

  if (productId) {
    res.status(200).json(productId);
  } else {
    res.status(400).json({ msg: "Producto no encontrado" });
  }
});

router.post("/products", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock = 25,
    category,
  } = req.body;

  // VALIDAR LA EXISTENCIA DE TODOS LOS CAMPOS CON UTILS

  const newProduct = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  };

  const products = getProductsFromFile();
  newProduct.id = parseInt(products.length + 1);
  products.push(newProduct);
  saveProductsToFile(products);
  res.status(200).json(getProductsFromFile());
});

router.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock = 25,
    category,
  } = req.body;

  const newProduct = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  };

  const products = getProductsFromFile();
  const index = products.find((p) => p.id === id);

  if (index) {
    index.id = index.id;
    index.title =
      newProduct.title !== undefined ? newProduct.title : index.title;
    index.description =
      newProduct.description !== undefined
        ? newProduct.description
        : index.description;
    index.code = newProduct.code !== undefined ? newProduct.code : index.code;
    index.price =
      newProduct.price !== undefined ? newProduct.price : index.price;
    index.status =
      newProduct.status !== undefined ? newProduct.status : index.status;
    index.stock =
      newProduct.stock !== undefined ? newProduct.stock : index.stock;
    index.category =
      newProduct.category !== undefined ? newProduct.category : index.category;
    saveProductsToFile(products);
    res.status(200).json({ msg: "Producto modificado" });
  } else {
    res.status(400).json({ msg: "Producto no encontrado" });
  }
});

router.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let products = getProductsFromFile();
  products = products.filter((p) => p.id !== id);
  if (products) {
    saveProductsToFile(products);
    res.status(200).json({ msg: "Producto Eliminado" });
  } else if (!products) {
    res.status(400).json({ msg: "No se pudo eliminar el producto" });
  }
});

module.exports = router;
