// productsRoutes.js
const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los productos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM productos";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los productos:", err);
      res.status(500).json({ error: "Error al obtener los productos" });
      return;
    }

    res.json(results);
  });
});
// Ruta para obtener un producto por su id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM productos WHERE id_producto = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener el producto:", err);
      res.status(500).json({ error: "Error al obtener el producto" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.json(results[0]);
  });
});

module.exports = router;
