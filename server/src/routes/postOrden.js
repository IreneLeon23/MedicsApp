// routes/postOrden.js
const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Ruta para guardar una nueva orden en las tablas 'clientes' y 'orden_cotizacion'
router.post("/NewOrden", (req, res) => {
  const formData = req.body;


  // Iniciar una transacción para asegurar que los datos se inserten en ambas tablas o ninguna
  connection.beginTransaction((error) => {
    if (error) {
      console.error("Error al iniciar la transacción:", error);
      return res.status(500).json({ error: "Error al guardar la orden" });
    }

    const checkEquipoQuery = "SELECT id_producto FROM productos WHERE nombre = ?";
    connection.query(checkEquipoQuery, [formData.equipo], (error, result) => {
      if (error) {
        connection.rollback(() => {
          console.error("Error al verificar el equipo:", error);
          res.status(500).json({ error: "Error al guardar la orden" });
        });
      } else {
        let fkProducto;

        if (result.length === 0) {
          // El equipo no está registrado, entonces lo agregamos a la tabla 'productos'
          const insertProductoQuery =
            "INSERT INTO productos (nombre, marca, modelo) VALUES (?, ?, ?)";
          connection.query(
            insertProductoQuery,
            [formData.equipo, formData.marca, formData.modelo],
            (error, result) => {
              if (error) {
                connection.rollback(() => {
                  console.error("Error al insertar el nuevo equipo:", error);
                  res.status(500).json({ error: "Error al guardar la orden" });
                });
              } else {
                fkProducto = result.insertId;
                saveOrden(fkProducto);
              }
            }
          );
        } else {
          // El equipo ya está registrado en la tabla 'productos'
          fkProducto = result[0].id_producto;
          saveOrden(fkProducto);
        }
      }
    });
  });

  function saveOrden(fkProducto) {
    const clienteData = {
      clave_cliente: formData.idCliente,
      nombre: formData.nombreCliente,
      telefono: formData.telCliente,
      whatsapp: formData.whatsCliente,
      correo: formData.emailCliente,
      direccion: formData.direccionCliente,
    };

    const insertClienteQuery = "INSERT INTO clientes SET ?";
    connection.query(insertClienteQuery, clienteData, (error, result) => {
      if (error) {
        connection.rollback(() => {
          console.error("Error al guardar el cliente:", error);
          res.status(500).json({ error: "Error al guardar el cliente" });
        });
      } else {
        // Obtener el ID del cliente recién insertado (ya obtenido en el frontend)
        const clienteId = result.insertId;

        // Guardar datos de la orden en la tabla 'orden_cotizacion'
        const ordenData = {
          folio: formData.folio,
          fk_cliente: clienteId,
          estado: formData.estado,
          equipo: formData.equipo,
          falla: formData.falla,
          fecha_prob_entrega: formData.fechaProbEnrega,
          estatus_orden: formData.estatusOrden,
          anticipo: formData.anticipo,
          marca: formData.marca,
          modelo: formData.modelo,
          num_serie: formData.numSerie,
          tipo_reparacion: formData.tipoReparacion,
          tiempo_reparacion: formData.tiempoReparacion,
          tipo_mantenimiento: formData.tipoMantenimiento,
          costo_flete: formData.costoFlete,
          costo_diagnostico: formData.costoDiagnostico,
          fk_producto: fkProducto,
        };

        const insertOrdenQuery = "INSERT INTO orden_cotizacion SET ?";
        connection.query(insertOrdenQuery, ordenData, (error, result) => {
          if (error) {
            connection.rollback(() => {
              console.error("Error al guardar la orden:", error);
              res.status(500).json({ error: "Error al guardar la orden" });
            });
          } else {
            connection.commit((error) => {
              if (error) {
                connection.rollback(() => {
                  console.error("Error al confirmar la transacción:", error);
                  res.status(500).json({ error: "Error al guardar la orden" });
                });
              } else {
                console.log("Orden guardada exitosamente.");
                res
                  .status(200)
                  .json({ message: "Orden guardada exitosamente" });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;