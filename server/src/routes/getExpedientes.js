const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener todos los campos de la tabla ordenes_servicio
router.get("/expedientes", (req, res) => {
  // Realizar la consulta SQL para obtener los campos de la tabla ordenes_servicio
  const sql = `
  SELECT 
    expedientes.*,
    orden_cotizacion.folio,
    orden_cotizacion.descripcion AS descripcion_equipo,
    orden_cotizacion.estado_equipo,
    usuarios.nombre AS nombre_usuario,
    clientes.nombre AS nombre_cliente,
    clientes.telefono AS telefono_cliente,
    clientes.whatsapp AS whatsapp_cliente,
    clientes.direccion AS direccion_cliente
  FROM expedientes
  INNER JOIN orden_cotizacion ON expedientes.fk_servicio = orden_cotizacion.folio
  INNER JOIN usuarios ON expedientes.fk_usuario = usuarios.clave_usuario
  INNER JOIN clientes ON orden_cotizacion.fk_cliente = clientes.clave_cliente;
`;

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
