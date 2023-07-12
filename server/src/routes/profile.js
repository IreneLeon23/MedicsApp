const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para obtener los datos de un usuario por ID
router.get('/:id', (req, res) => {
  const idUsuario = req.params.id;

  // Consulta SQL para obtener los datos del usuario por ID
  const query = `SELECT * FROM usuarios WHERE id_usuario = ${idUsuario}`;

  // Ejecutar la consulta en la base de datos
  connection.query(query, (error, results) => {
    if (error) {
      // Ocurrió un error al ejecutar la consulta
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del usuario' });
    } else {
      if (results.length === 0) {
        // No se encontró un usuario con el ID especificado
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        // Se encontró un usuario con el ID especificado
        const usuario = results[0];
        res.json(usuario);
      }
    }
  });
});

module.exports = router;
