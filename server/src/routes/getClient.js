
const express = require("express");
const router = express.Router();
const connection = require("../connection"); 

// Ruta para obtener el último ID Cliente de la tabla clientes
router.get("/ultimoIdCliente", (req, res) => {
    const sql = `SELECT MAX(clave_cliente) AS ultimoIdCliente FROM clientes`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error al obtener el último ID Cliente:", err);
        res.status(500).json({ error: "Error al obtener el último ID Cliente" });
        return;
      }
  
      // Si no hay registros en la tabla, retornar el ID Cliente inicial como 1
      const ultimoIdCliente = results.length > 0 ? results[0].ultimoIdCliente : 0;
      res.json(ultimoIdCliente);
    });
  });
  
module.exports = router;