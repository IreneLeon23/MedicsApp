const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Ruta para obtener todos los trabajos
router.get("/getTrabajo", async (req, res) => {
  try {
    const sql = `
      SELECT t.*, u.nombre AS nombre_usuario
      FROM trabajos AS t
      LEFT JOIN usuarios AS u ON t.fk_usuario = u.clave_usuario
    `;

    const [results] = await pool.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los trabajos:", error);
    res.status(500).json({ error: "Error al obtener los trabajos" });
  }
});

// Ruta para obtener un trabajo por su id
router.get("/getTrabajo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
      SELECT t.*, u.nombre AS nombre_usuario
      FROM trabajos AS t
      LEFT JOIN usuarios AS u ON t.fk_usuario = u.clave_usuario
      WHERE t.id_trabajo = ?
    `;

    const [results] = await pool.execute(sql, [id]);
    if (results.length === 0) {
      res.status(404).json({ error: "Trabajo no encontrado" });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error("Error al obtener el trabajo:", error);
    res.status(500).json({ error: "Error al obtener el trabajo" });
  }
});

// Ruta para crear un nuevo trabajo
router.post("/newTrabajo", (req, res) => {
  const formData = req.body;

  if (
    !formData.fkOrdenCotizacion ||
    !formData.nombreTrabajo ||
    !formData.descripcion ||
    !formData.horasTrabajo ||
    !formData.dificultad ||
    !formData.costoMaterial
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios" });
  }

  const importe =
    parseFloat(formData.horasTrabajo) *
      parseFloat(formData.dificultad) +
    parseFloat(formData.costoMaterial);

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
  pool.query(insertTrabajoQuery, trabajoData, (error, result) => {
    if (error) {
      console.error("Error al guardar el trabajo:", error);
      res.status(500).json({ error: "Error al guardar el trabajo" });
    } else {
      console.log("Trabajo guardado exitosamente.");
      res
        .status(200)
        .json({ message: "Trabajo guardado exitosamente" });
    }
  });
});

// Ruta para editar un trabajo por su id
router.put("/editTrabajo/:id", (req, res) => {
  const trabajoId = req.params.id;
  const formData = req.body;

  if (
    !formData.nombre_trabajo ||
    !formData.descripcion ||
    !formData.horas_trabajo ||
    !formData.dificultad ||
    !formData.costo_material
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios" });
  }

  const importe =
    parseFloat(formData.horas_trabajo) *
      parseFloat(formData.dificultad) +
    parseFloat(formData.costo_material);

  const trabajoData = {
    nombre_trabajo: formData.nombre_trabajo,
    descripcion: formData.descripcion,
    horas_trabajo: formData.horas_trabajo,
    importe,
    dificultad: formData.dificultad,
    costo_material: formData.costo_material,
  };

  const updateTrabajoQuery = "UPDATE trabajos SET ? WHERE id_trabajo = ?";
  pool.query(
    updateTrabajoQuery,
    [trabajoData, trabajoId],
    (error, result) => {
      if (error) {
        console.error("Error al actualizar el trabajo:", error);
        res.status(500).json({ error: "Error al actualizar el trabajo" });
      } else {
        console.log("Trabajo actualizado exitosamente.");
        res
          .status(200)
          .json({ message: "Trabajo actualizado exitosamente" });
      }
    }
  );
});

module.exports = router;
