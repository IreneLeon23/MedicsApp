const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Ruta para actualizar un usuario por su clave_usuario
router.put("/updateUser/:clave_usuario", (req, res) => {
  const clave_usuario = req.params.clave_usuario;
  const updatedData = req.body;

  const updateQuery = "UPDATE usuarios SET ? WHERE clave_usuario = ?";
  pool.query(updateQuery, [updatedData, clave_usuario], (error, result) => {
    if (error) {
      console.error("Error al actualizar al usuario", error);
      res.status(500).json({ error: "Error al actualizar al usuario" });
    } else {
      console.log("Usuario actualizado exitosamente.");
      res.status(200).json({ message: "Usuario actualizado exitosamente" });
    }
  });
});

module.exports = router;
