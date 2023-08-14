const express = require("express");
const router = express.Router();
const connection = require("../connection"); 

router.put("/updateUser/:clave_usuario", (req, res) => {
    const clave_usuario = req.params.clave_usuario;
    const updatedData = req.body;
  
    const updateQuery = "UPDATE usuarios SET ? WHERE clave_usuario = ?";
    connection.query(updateQuery, [updatedData, clave_usuario], (error, result) => {
      if (error) {
        console.error("Error al actualizar al cliente", error);
        res.status(500).json({ error: "Error al actualizar al usuario" });
      } else {
        console.log("Cliente actualizada exitosamente.");
        res.status(200).json({ message: "Usuario actualizada exitosamente" });
      }
    });
  });
  module.exports = router;