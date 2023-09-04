const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/getCotizacion", async (req, res) => {
  try {
    const sql =
      'SELECT oc.folio, (SELECT c.nombre FROM clientes AS c WHERE c.clave_cliente = oc.fk_cliente) AS nombre_cliente, MAX(oc.estado) AS estado, MAX(oc.fecha_captura) AS fecha_captura, MAX(oc.fecha_compromiso) AS fecha_compromiso, MAX(oc.comentario_cotizacion) AS comentario_cotizacion, MAX(oc.equipo) AS equipo, (SELECT u.nombre FROM usuarios AS u WHERE u.clave_usuario = oc.fk_usuario) AS nombre_usuario FROM orden_cotizacion AS oc GROUP BY oc.folio;';

    const [results] = await pool.execute(sql);

    // Enviar las órdenes de servicio obtenidas como respuesta
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las órdenes de servicio:", error);
    res.status(500).json({ error: "Error al obtener las órdenes de servicio" });
  }
});

// Editar cotizaciones
router.put("/editCotizacion/:folio", async (req, res) => {
  const folio = req.params.folio;
  const formData = req.body;

  if (!formData.estatus_orden || !formData.fecha_captura || !formData.fecha_compromiso || !formData.comentario_cotizacion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const updateFields = {
    estatus_orden: formData.estatus_orden,
    fecha_captura: formData.fecha_captura,
    fecha_compromiso: formData.fecha_compromiso,
    comentario_cotizacion: formData.comentario_cotizacion,
  };

  try {
    const [result] = await pool.execute("UPDATE orden_cotizacion SET ? WHERE folio = ?", [updateFields, folio]);

    console.log("Cotización actualizada exitosamente.");
    res.status(200).json({ message: "Cotización actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la cotización:", error);
    res.status(500).json({ error: "Error al actualizar la cotización" });
  }
});

module.exports = router;
