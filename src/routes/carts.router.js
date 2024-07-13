const express = require("express");
const router = express.Router();
const {
  initializerFile,
  saveCartsToFile,
  getCartsFromFile,
} = require("../utils/carts.utils.js");

const {
  saveProductsToFile,
  getProductsFromFile,
} = require("../utils/products.utils.js");

initializerFile();

router.get("/carts/:id", (req, res) => {
  const cid = parseInt(req.params.id);
  const dataCarts = getCartsFromFile();
  const newData = dataCarts.find((d) => d.id === cid);

  if (newData) {
    if (newData.products.length !== 0) {
      res.status(200).json(newData.products);
    }
    if (newData.products.length === 0) {
      res.status(200).json({ msg: "Su carrito esta vacío" });
    }
  } else {
    res.status(400).json({ msg: "Carrito inexistente" });
  }
});

router.post("/carts", (req, res) => {
  const newCart = {
    id: undefined,
    products: [],
  };
  const carts = getCartsFromFile();
  newCart.id = parseInt(carts.length + 1);
  carts.push(newCart);
  saveCartsToFile(carts);
});

router.post("/carts/:cid/product/:pid", (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const { quantity } = req.body;
  if (quantity == undefined || quantity <= 0) {
    return res.status(404).json({ msg: "Ingrese una cantidad correcta" });
  }

  const carts = getCartsFromFile();
  const products = getProductsFromFile();

  const cart = carts.find((c) => c.id === cid);
  if (cart === undefined) {
    return res.status(404).json({ msg: "Carrito inexistente" });
  }
  const product = products.find((p) => p.id === pid);
  if (product === undefined) {
    return res.status(404).json({ msg: "Producto inexistente" });
  }

  const indexProduct = cart.products.findIndex((i) => i.idProduct == pid);

  if (indexProduct >= 0 && cart.products[indexProduct].idProduct === pid) {
    console.log("idProducto: ", cart.products[indexProduct].idProduct);
    cart.products[indexProduct].quantity =
      cart.products[indexProduct].quantity + quantity;
    saveCartsToFile(carts);
    res.status(200).json({ msg: "Se incremento el stock" });
  } else {
    cart.products.push({ idProduct: product.id, quantity: quantity });
    saveCartsToFile(carts);
    res.status(200).json({ msg: "Prodcuto agregado a su carrito" });
  }
});

router.delete("/carts/:cid", (req, res) => {
  const cid = parseInt(req.params.cid);
  let carts = getCartsFromFile();
  carts = carts.filter((c) => c.id !== cid);
  if (carts) {
    saveCartsToFile(carts);
    res.status(200).json({ msg: "Producto Eliminado" });
  } else if (!carts) {
    res.status(400).json({ msg: "El producto no pudo ser eliminado" });
  }
});

module.exports = router;
