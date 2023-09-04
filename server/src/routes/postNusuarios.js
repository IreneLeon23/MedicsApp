const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Ruta para crear un nuevo usuario
router.post("/newUser", (req, res) => {
  const formData = req.body;

  if (!formData.clave_usuario || !formData.nombre || !formData.privilegio || !formData.correo || !formData.password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const usuariosData = {
    clave_usuario: formData.clave_usuario, 
    nombre: formData.nombre,
    privilegio: formData.privilegio,
    correo: formData.correo,
    password: formData.password,
    estatus: formData.estatus,
    descripcion: formData.descripcion,
  };

  const insertUsuariosQuery = "INSERT INTO usuarios SET ?";
  pool.query(insertUsuariosQuery, usuariosData, (error, result) => {
    if (error) {
      console.error("Error al guardar el usuario:", error);
      res.status(500).json({ error: "Error al guardar el usuario" });
    } else {
      console.log("Usuario guardado exitosamente.");
      res.status(200).json({ message: "Usuario guardado exitosamente" });
    }
  });
});

// Ruta para obtener el último valor de clave_usuario
router.get("/ultimoClaveUsuario", (req, res) => {
  const query = "SELECT MAX(clave_usuario) AS ultimoClaveUsuario FROM usuarios";
  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error al obtener el último valor de clave_usuario:", error);
      res.status(500).json({ error: "Error al obtener el último valor de clave_usuario" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Ruta para eliminar un usuario
router.delete("/deleteUser/:clave_usuario", (req, res) => {
  const claveUsuario = req.params.clave_usuario;

  if (!claveUsuario) {
    return res.status(400).json({ error: "La clave de usuario es obligatoria" });
  }

  const deleteUsuarioQuery = "DELETE FROM usuarios WHERE clave_usuario = ?";
  pool.query(deleteUsuarioQuery, [claveUsuario], (error, result) => {
    if (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ error: "Error al eliminar el usuario" });
    } else {
      console.log("Usuario eliminado exitosamente.");
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    }
  });
});

module.exports = router;
