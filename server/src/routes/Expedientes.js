const express = require("express");
const router = express.Router();
const connection = require("../connection");


// Ruta para obtener todos los campos de la tabla ordenes_servicio
router.get("/getExpedientes", (req, res) => {
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

// Ruta para postear nuevos expedientes
router.post("/newExpediente", (req, res) => {
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

  const insertExpedienteQuery = "INSERT INTO expedientes SET ?";
  connection.query(insertExpedienteQuery, expedienteData, (error, result) => {
    if (error) {
      console.error("Error al crear el expediente:", error);
      res.status(500).json({ error: "Error al crear el expediente" });
    } else {
      console.log("Expediente creado exitosamente.");
      res.status(201).json({ message: "Expediente creado exitosamente" });
    }
  });
});

// Ruta para editar campos de Expediente
router.put("/editExpediente/:id", (req, res) => {
  const expedienteId = req.params.id;
  const formData = req.body;

  const expedienteData = {
    id_expediente: formData.id_expediente,
    fecha_entrada: formData.fecha_entrada,
    fecha_entrega: formData.fecha_entrega,
    fk_servicio: formData.fk_servicio,
    // fk_usuario: formData.fk_usuario,
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

  const updateExpedienteQuery = "UPDATE expedientes SET ? WHERE id_expediente = ?";
const updateValues = [expedienteData, expedienteId];
connection.query(updateExpedienteQuery, updateValues, (error, result) => {
    if (error) {
      console.error("Error al editar el expediente:", error);
      res.status(500).json({ error: "Error al editar el expediente" });
    } else {
      console.log("Expediente editado exitosamente.");
      res.status(200).json({ message: "Expediente editado exitosamente" });
    }
  });
});
module.exports = router;
