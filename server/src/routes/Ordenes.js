const express = require("express");
const router = express.Router();
const pool = require("../connection");
const util = require('util');
const executeQuery = util.promisify(pool.query).bind(pool);

// Ruta para obtener todos los campos de la tabla orden_cotizacion con los joins
router.get("/getOrden", async (req, res) => {
  try {
    // Realizar la consulta SQL para obtener todos los campos de la tabla orden_cotizacion
    const sql = `
      SELECT orden_cotizacion.*, 
             productos.nombre AS nombre_producto,
             productos.descripcion AS descripcion_producto,
             usuarios.nombre AS nombre_usuario,
             clientes.nombre AS nombre_cliente,
             clientes.telefono AS telefono_cliente,
             clientes.whatsapp AS whats_cliente
      FROM orden_cotizacion
      INNER JOIN productos ON orden_cotizacion.fk_producto = productos.id_producto
      INNER JOIN usuarios ON orden_cotizacion.fk_usuario = usuarios.clave_usuario
      INNER JOIN clientes ON orden_cotizacion.fk_cliente = clientes.clave_cliente
    `;

    const [results] = await pool.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las órdenes de servicio:", error);
    res.status(500).json({ error: "Error al obtener las órdenes de servicio" });
  }
});

// Ruta para obtener el último folio de la tabla orden_cotizacion
router.get("/ultimoFolio", async (req, res) => {
  try {
    const sql = `SELECT MAX(folio) AS ultimoFolio FROM orden_cotizacion`;
    const [results] = await pool.execute(sql);

    // Si no hay registros en la tabla, retornar el folio inicial como 1
    const ultimoFolio = results.length > 0 ? results[0].ultimoFolio : 0;
    res.json(ultimoFolio);
  } catch (error) {
    console.error("Error al obtener el último folio:", error);
    res.status(500).json({ error: "Error al obtener el último folio" });
  }
});

// Ruta para guardar una nueva orden en las tablas 'clientes' y 'orden_cotizacion'
router.post("/newOrden", async (req, res) => {
  const formData = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check if the equipo is already registered
    const checkEquipoQuery = "SELECT id_producto FROM productos WHERE nombre = ?";
    const [equipoResult] = await executeQuery(checkEquipoQuery, [formData.equipo]);

    let fkProducto;

    if (equipoResult.length === 0) {
      // The equipo is not registered, so we add it to the 'productos' table
      const insertProductoQuery = "INSERT INTO productos (nombre, marca, modelo) VALUES (?, ?, ?)";
      const [insertProductoResult] = await executeQuery(insertProductoQuery, [formData.equipo, formData.marca, formData.modelo]);
      fkProducto = insertProductoResult.insertId;
    } else {
      // The equipo is already registered in the 'productos' table
      fkProducto = equipoResult[0].id_producto;
    }

    // Store client data in the 'clientes' table
    const insertClienteQuery = "INSERT INTO clientes (clave_cliente, nombre, telefono, whatsapp, correo, direccion) VALUES (?, ?, ?, ?, ?, ?)";
    const [clienteResult] = await executeQuery(insertClienteQuery, [
      formData.idCliente,
      formData.nombreCliente,
      formData.telCliente,
      formData.whatsCliente,
      formData.emailCliente,
      formData.direccionCliente,
    ]);
    const clienteId = clienteResult.insertId; // Get the ID of the newly inserted client

    // Store order data in the 'orden_cotizacion' table
    const insertOrdenQuery = `
      INSERT INTO orden_cotizacion (folio, fk_cliente, estado, equipo, falla, fecha_prob_entrega, estatus_orden, anticipo, marca, modelo, num_serie, tipo_reparacion, tiempo_reparacion, tipo_mantenimiento, costo_flete, costo_diagnostico, fk_producto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [insertOrdenResult] = await executeQuery(insertOrdenQuery, [
      formData.folio,
      clienteId,
      formData.estado,
      formData.equipo,
      formData.falla,
      formData.fechaProbEnrega,
      formData.estatusOrden,
      formData.anticipo,
      formData.marca,
      formData.modelo,
      formData.numSerie,
      formData.tipoReparacion,
      formData.tiempoReparacion,
      formData.tipoMantenimiento,
      formData.costoFlete,
      formData.costoDiagnostico,
      fkProducto,
    ]);

    await connection.commit();

    console.log("Orden guardada exitosamente.");
    res.status(200).json({ message: "Orden guardada exitosamente" });
  } catch (error) {
    await connection.rollback(); // Revert the transaction in case of an error
    console.error("Error al guardar la orden:", error);
    res.status(500).json({ error: "Error al guardar la orden" });
  } finally {
    if (connection) {
      connection.release(); // Release the connection after finishing
    }
  }
});

router.put("/editOrden/:folio", async (req, res) => {
  const folio = req.params.folio;
  const updatedData = req.body;

  try {
    const updateQuery = "UPDATE orden_cotizacion SET ? WHERE folio = ?";
    await pool.execute(updateQuery, [updatedData, folio]);

    console.log("Orden actualizada exitosamente.");
    res.status(200).json({ message: "Orden actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    res.status(500).json({ error: "Error al actualizar la orden" });
  }
});

module.exports = router;
