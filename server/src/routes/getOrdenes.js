const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los campos de la tabla ordenes_servicio
router.get("/ordenes", (req, res) => {
  // Realizar la consulta SQL para obtener los campos de la tabla ordenes_servicio
  const sql = "SELECT * FROM ordenes_servicio";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener las ordenes de servicio:", err);
      res.status(500).json({ error: "Error al obtener las ordenes de servicio" });
      return;
    }

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  });
});

module.exports = router;
