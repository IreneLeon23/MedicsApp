const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Inicio de sesión para usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
      [email, password]
    );

    if (results.length > 0) {
      const usuario = results[0];
      switch (usuario.privilegio) {
        case "cliente":
          // Usuario con privilegio de cliente
          res.status(200).json({ privilege: "cliente", idUsuario: usuario.clave_usuario });
          break;
        case "vendedor":
          // Usuario con privilegio de vendedor
          res.status(200).json({ privilege: "vendedor", idUsuario: usuario.clave_usuario });
          break;
        case "taller":
          // Usuario con privilegio de taller
          res.status(200).json({ privilege: "taller", idUsuario: usuario.clave_usuario });
          break;
        case "administrador":
          // Usuario con privilegio de administrador
          res.status(200).json({ privilege: "administrador", idUsuario: usuario.clave_usuario });
          break;
        default:
          res.status(401).json({ error: "Credenciales inválidas" });
          break;
      }
    } else {
      // Las credenciales no son válidas
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta para el registro de usuarios
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Puedes agregar validaciones adicionales aquí

  try {
    const [results, fields] = await pool.execute(
      "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    // Registro exitoso
    res.status(200).json({ message: "Registro exitoso", privilege: "cliente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
