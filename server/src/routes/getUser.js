// usersRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
      return;
    }

    res.json(results);
  });
});

// Ruta para obtener un usuario por su id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

module.exports = router;
