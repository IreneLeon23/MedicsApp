const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/ultimoIdCliente", async (req, res) => {
  try {
    const sql = `SELECT MAX(clave_cliente) AS ultimoIdCliente FROM clientes`;
    const [results] = await pool.execute(sql);

    // Si no hay registros en la tabla, retornar el ID Cliente inicial como 1
    const ultimoIdCliente = results.length > 0 ? results[0].ultimoIdCliente : 0;
    res.json(ultimoIdCliente);
  } catch (error) {
    console.error("Error al obtener el último ID Cliente:", error);
    res.status(500).json({ error: "Error al obtener el último ID Cliente" });
  }
});

module.exports = router;
