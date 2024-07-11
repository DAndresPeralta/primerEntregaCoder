const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
