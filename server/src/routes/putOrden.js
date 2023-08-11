// routes/putOrden.js
const express = require("express");
const router = express.Router();
const connection = require("../connection");
// Actualiza una orden de cotización por su id y devuelve el objeto con los 

router.put("/update/:folio", (req, res) => {
    const folio = req.params.folio;
    const updatedData = req.body;
  
    const updateQuery = "UPDATE orden_cotizacion SET ? WHERE folio = ?";
    connection.query(updateQuery, [updatedData, folio], (error, result) => {
      if (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).json({ error: "Error al actualizar la orden" });
      } else {
        console.log("Orden actualizada exitosamente.");
        res.status(200).json({ message: "Orden actualizada exitosamente" });
      }
    });
  });
  module.exports = router;