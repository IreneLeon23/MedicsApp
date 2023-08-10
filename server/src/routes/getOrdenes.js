const express = require("express");
const router = express.Router();
const connection = require("../connection");
// Ruta para obtener todos los campos de la tabla orden_cotizacion con los joins
router.get("/ordenes", (req, res) => {
  // Realizar la consulta SQL para obtener todos los campos de la tabla orden_cotizacion
  const sql = `
    SELECT orden_cotizacion.*, 
           productos.nombre AS nombre_producto,
           productos.descripcion AS descripcion_producto,
           usuarios.nombre AS nombre_usuario,
           clientes.nombre AS nombre_cliente,
           clientes.telefono AS telefono_cliente,
           clientes.whatsapp AS whats_cliente
    FROM orden_cotizacion
    INNER JOIN productos ON orden_cotizacion.fk_producto = productos.id_producto
    INNER JOIN usuarios ON orden_cotizacion.fk_usuario = usuarios.clave_usuario
    INNER JOIN clientes ON orden_cotizacion.fk_cliente = clientes.clave_cliente
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener las órdenes de servicio:", err);
      res
        .status(500)
        .json({ error: "Error al obtener las órdenes de servicio" });
      return;
    }
    // Enviar las órdenes de servicio obtenidas como respuesta
    res.json(results);
  });
});
// Ruta para obtener el último folio de la tabla orden_cotizacion
router.get("/ordenes/ultimoFolio", (req, res) => {
  const sql = `SELECT MAX(folio) AS ultimoFolio FROM orden_cotizacion`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener el último folio:", err);
      res.status(500).json({ error: "Error al obtener el último folio" });
      return;
    }
    // Si no hay registros en la tabla, retornar el folio inicial como 1
    const ultimoFolio = results.length > 0 ? results[0].ultimoFolio : 0;
    res.json(ultimoFolio);
  });
});

module.exports = router;
