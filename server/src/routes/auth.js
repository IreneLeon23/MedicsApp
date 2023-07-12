const express = require("express");
const router = express.Router();
const connection = require("../connection");

//Inicio de sesión para usuario
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
    [email, password],
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
      } else {
        if (results.length > 0) {
          const usuario = results[0];
          switch (usuario.privilegio) {
            case "cliente":
              // Usuario con privilegio de cliente
              res
                .status(200)
                .json({ privilege: "cliente", idUsuario: usuario.id_usuario });
              break;
            case "vendedor":
              // Usuario con privilegio de vendedor
              res
                .status(200)
                .json({ privilege: "vendedor", idUsuario: usuario.id_usuario });
              break;
            case "taller":
              // Usuario con privilegio de taller
              res
                .status(200)
                .json({ privilege: "taller", idUsuario: usuario.id_usuario });
              break;
              case "administrador":
                // Usuario con privilegio de taller
                res
                  .status(200)
                  .json({ privilege: "administrador", idUsuario: usuario.id_usuario });
                  //Usuario con privilegio de administrador
                break;
            default:
              res.status(401).json({ error: "Credenciales inválidas" });

              break;
          }
        } else {
          // Las credenciales no son válidas
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }
    }
  );
});

// Ruta para el registro de usuarios
router.post("/register", function (req, res) {
  const { name, email, password } = req.body;
  // Puedes agregar validaciones adicionales aquí

  connection.query(
    "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (error, results, fields) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor" });
      } else {
        // Registro exitoso
        res.status(200).json({ message: "Registro exitoso", privilege: "cliente" });
      }
    }
  );
});

module.exports = router;
