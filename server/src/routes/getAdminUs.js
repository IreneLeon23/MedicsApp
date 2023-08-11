const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los campos de la tabla trabajos
router.get("/adminus", (req, res) => {
  // Realizar la consulta SQL para obtener los campos de la tabla trabajos
  const sql = `
    SELECT clave_usuario, nombre, privilegio, correo, password, estatus, descripcion
    FROM usuarios;
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los usuarios:", err);
      res.status(500).json({ error: "Error al obtener los usuarios" });
      return;
    }

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  });
});

module.exports = router;
