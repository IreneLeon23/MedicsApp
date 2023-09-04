const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/getExpedientes", async (req, res) => {
  try {
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

    const [results] = await pool.execute(sql);

    // Enviar los campos obtenidos como respuesta
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los expedientes:", error);
    res.status(500).json({ error: "Error al obtener los expedientes" });
  }
});

router.post("/newExpediente", async (req, res) => {
  const formData = req.body;

  const expedienteData = {
    id_expediente: formData.id_expediente,
    fk_servicio: formData.fk_servicio,
    fecha_entrada: formData.fecha_entrada,
    fecha_entrega: formData.fecha_entrega,
    tiempo_taller: formData.tiempo_taller,
    costo_reparacion: formData.costo_reparacion,
    tiempo_proximo_servicio: formData.tiempo_proximo_servicio,
    notas_cliente: formData.notas_cliente,
    comentarios_internos: formData.comentarios_internos,
    razon_reparacion: formData.razon_reparacion,
    observaciones: formData.observaciones,
    sugerencias: formData.sugerencias,
  };

  try {
    const [result] = await pool.execute("INSERT INTO expedientes SET ?", [expedienteData]);

    console.log("Expediente creado exitosamente.");
    res.status(201).json({ message: "Expediente creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el expediente:", error);
    res.status(500).json({ error: "Error al crear el expediente" });
  }
});

router.put("/editExpediente/:id", async (req, res) => {
  const expedienteId = req.params.id;
  const formData = req.body;

  const expedienteData = {
    id_expediente: formData.id_expediente,
    fecha_entrada: formData.fecha_entrada,
    fecha_entrega: formData.fecha_entrega,
    fk_servicio: formData.fk_servicio,
    direccion: formData.direccion,
    tiempo_taller: formData.tiempo_taller,
    costo_reparacion: formData.costo_reparacion,
    tiempo_proximo_servicio: formData.tiempo_proximo_servicio,
    notas_cliente: formData.notas_cliente,
    comentarios_internos: formData.comentarios_internos,
    razon_reparacion: formData.razon_reparacion,
    observaciones: formData.observaciones,
    sugerencias: formData.sugerencias,
  };

  try {
    const [result] = await pool.execute("UPDATE expedientes SET ? WHERE id_expediente = ?", [expedienteData, expedienteId]);

    console.log("Expediente editado exitosamente.");
    res.status(200).json({ message: "Expediente editado exitosamente" });
  } catch (error) {
    console.error("Error al editar el expediente:", error);
    res.status(500).json({ error: "Error al editar el expediente" });
  }
});

module.exports = router;
