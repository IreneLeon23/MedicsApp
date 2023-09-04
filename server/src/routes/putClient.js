const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Ruta para actualizar un cliente por su clave_cliente
router.put("/update/:clave_cliente", (req, res) => {
  const clave_cliente = req.params.clave_cliente;
  const updatedData = req.body;

  const updateQuery = "UPDATE clientes SET ? WHERE clave_cliente = ?";
  pool.query(updateQuery, [updatedData, clave_cliente], (error, result) => {
    if (error) {
      console.error("Error al actualizar al cliente", error);
      res.status(500).json({ error: "Error al actualizar al cliente" });
    } else {
      console.log("Cliente actualizado exitosamente.");
      res.status(200).json({ message: "Cliente actualizado exitosamente" });
    }
  });
});

module.exports = router;
