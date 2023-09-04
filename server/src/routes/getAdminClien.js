const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/clients", async (req, res) => {
  try {
    const sql = `
      SELECT clave_cliente, nombre, telefono, whatsapp, correo, direccion
      FROM clientes;
    `;

    const [results] = await pool.execute(sql);

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

module.exports = router;
