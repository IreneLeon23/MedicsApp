// usersRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Ruta para obtener todos los usuarios
router.get('/trabajos', (req, res) => {
    const sql = `
    SELECT t.*, u.nombre AS nombre_usuario
    FROM trabajos AS t
    LEFT JOIN usuarios AS u ON t.fk_usuario = u.clave_usuario
  `;


  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
      return;
    }

    res.json(results);
  });
});

// Ruta para obtener un trabajo por su id
router.get("/:id", (req, res) => {
    const { id } = req.params;
  const sql = `
    SELECT t.*, u.nombre AS nombre_usuario
    FROM trabajos AS t
    LEFT JOIN usuarios AS u ON t.fk_usuario = u.clave_usuario
    WHERE t.id_trabajo = ?
  `;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el trabajo' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Trabajo no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

module.exports = router;
