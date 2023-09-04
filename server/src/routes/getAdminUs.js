const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/adminus", async (req, res) => {
  try {
    const sql = `
      SELECT clave_usuario, nombre, privilegio, correo, password, estatus, descripcion
      FROM usuarios;
    `;

    const [results] = await pool.execute(sql);

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

module.exports = router;
