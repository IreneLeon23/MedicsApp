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

// Ruta para cambiar el estado y paso actual de una orden de servicio
router.post("/ordenes/changeState", (req, res) => {
  // Obtener los datos enviados en el cuerpo de la solicitud
  const { orderId, newState, newStep } = req.body;

  // Validar que se envíen todos los datos necesarios
  if (!orderId || !newState || !newStep) {
    res.status(400).json({ error: "Faltan datos en la solicitud" });
    return;
  }

  // Realizar la consulta SQL para actualizar el estado y paso actual de la orden
  const sql = `
    UPDATE orden_cotizacion
    SET estado = ?,
        paso_actual = ?
    WHERE id = ?
  `;

  connection.query(sql, [newState, newStep, orderId], (err, results) => {
    if (err) {
      console.error("Error al cambiar el estado de la orden:", err);
      res.status(500).json({ error: "Error al cambiar el estado de la orden" });
      return;
    }

    // Verificar si se actualizó algún registro
    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "No se encontró la orden con el ID proporcionado" });
      return;
    }

    // Enviar una respuesta exitosa si se actualizó el estado correctamente
    res.json({ success: true });
  });
});

module.exports = router;
