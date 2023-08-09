const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.post("/", (req, res) => {
  const formData = req.body;

  if (!formData.fkOrdenCotizacion || !formData.nombreTrabajo || !formData.descripcion || !formData.horasTrabajo || !formData.dificultad || !formData.costoMaterial) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const importe = parseFloat(formData.horasTrabajo) * parseFloat(formData.dificultad) + parseFloat(formData.costoMaterial);

  const trabajoData = {
    fk_orden_cotizacion: formData.fkOrdenCotizacion,
    nombre_trabajo: formData.nombreTrabajo,
    descripcion: formData.descripcion,
    horas_trabajo: formData.horasTrabajo,
    importe,
    dificultad: formData.dificultad,
    costo_material: formData.costoMaterial,
  };

  const insertTrabajoQuery = "INSERT INTO trabajos SET ?";
  connection.query(insertTrabajoQuery, trabajoData, (error, result) => {
    if (error) {
      console.error("Error al guardar el trabajo:", error);
      res.status(500).json({ error: "Error al guardar el trabajo" });
    } else {
      console.log("Trabajo guardado exitosamente.");
      res.status(200).json({ message: "Trabajo guardado exitosamente" });
    }
  });
});

module.exports = router;
