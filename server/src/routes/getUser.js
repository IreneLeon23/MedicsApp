const express = require('express');
const router = express.Router();
const pool = require('../connection');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM usuarios';

    const [results] = await pool.execute(sql);

    res.json(results);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para obtener un usuario por su id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";

  try {
    const [results] = await pool.execute(sql, [id]);

    if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

module.exports = router;
