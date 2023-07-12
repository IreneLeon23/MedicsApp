const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los campos de la tabla ordenes_servicio
router.get("/expedientes", (req, res) => {
  // Realizar la consulta SQL para obtener los campos de la tabla ordenes_servicio
  const sql = "SELECT * FROM expedientes";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los expedientes:", err);
      res.status(500).json({ error: "Error al obtener los expedientes" });
      return;
    }

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  });
});

module.exports = router;
