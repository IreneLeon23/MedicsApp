const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM productos";
    const [results] = await pool.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Ruta para obtener un producto por su id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM productos WHERE id_producto = ?";
    const [results] = await pool.execute(sql, [id]);

    if (results.length === 0) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

module.exports = router;
