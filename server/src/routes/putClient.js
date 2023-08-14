const express = require("express");
const router = express.Router();
const connection = require("../connection"); 

router.put("/update/:clave_cliente", (req, res) => {
    const clave_cliente = req.params.clave_cliente;
    const updatedData = req.body;
  
    const updateQuery = "UPDATE clientes SET ? WHERE clave_cliente = ?";
    connection.query(updateQuery, [updatedData, clave_cliente], (error, result) => {
      if (error) {
        console.error("Error al actualizar al cliente", error);
        res.status(500).json({ error: "Error al actualizar al cliente" });
      } else {
        console.log("Cliente actualizada exitosamente.");
        res.status(200).json({ message: "Cliente actualizada exitosamente" });
      }
    });
  });
  module.exports = router;