const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los campos de la tabla trabajos
router.get("/clients", (req, res) => {
  // Realizar la consulta SQL para obtener los campos de la tabla trabajos
  const sql = `
    SELECT clave_cliente, nombre, telefono, whatsapp, correo, direccion
    FROM clientes;
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los clientes:", err);
      res.status(500).json({ error: "Error al obtener los clientes" });
      return;
    }

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  });
});

module.exports = router;
