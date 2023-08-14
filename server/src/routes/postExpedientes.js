const express = require("express");
const router = express.Router();
const connection = require("../connection");

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

module.exports = router;
