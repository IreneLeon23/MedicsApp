const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/getReporte", async (req, res) => {
  try {
    // Realizar las consultas SQL para obtener los datos requeridos
    const sql = `
      SELECT p.nombre, COUNT(oc.fk_producto) AS mas_reparado
      FROM orden_cotizacion oc
      JOIN productos p ON oc.fk_producto = p.id_producto
      GROUP BY oc.fk_producto
      ORDER BY mas_reparado DESC
      LIMIT 1;
    `;
    const sql2 = `
      SELECT oc.tipo_mantenimiento, COUNT(oc.fk_producto) AS mas_repetido
      FROM orden_cotizacion oc
      JOIN productos p ON oc.fk_producto = p.id_producto
      WHERE oc.tipo_mantenimiento IN ('Mantenimiento correctivo', 'Mantenimiento preventivo')
      GROUP BY oc.tipo_mantenimiento
      ORDER BY mas_repetido DESC
      LIMIT 1;
    `;
    const sql3 = `
      SELECT u.nombre, oc.fk_usuario, COUNT(oc.fk_usuario) AS repeticiones
      FROM orden_cotizacion oc
      JOIN usuarios u ON oc.fk_usuario = u.clave_usuario
      GROUP BY oc.fk_usuario, u.nombre
      ORDER BY repeticiones DESC
      LIMIT 1;
    `;
    const sql4 = `
      SELECT c.nombre, oc.fk_cliente, COUNT(oc.fk_cliente) AS repeticiones
      FROM orden_cotizacion oc
      JOIN clientes c ON oc.fk_cliente = c.clave_cliente
      GROUP BY oc.fk_cliente, c.nombre
      ORDER BY repeticiones DESC
      LIMIT 1;
    `;

    // Ejecutar las consultas en paralelo usando Promise.all
    const [result1, result2, result3, result4] = await Promise.all([
      executeQuery(sql),
      executeQuery(sql2),
      executeQuery(sql3),
      executeQuery(sql4)
    ]);

    // Combinar las respuestas de todas las consultas
    const combinedResults = {
      result1: result1,
      result2: result2,
      result3: result3,
      result4: result4
    };

    // Enviar la respuesta combinada
    res.json(combinedResults);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// Función auxiliar para ejecutar una consulta SQL usando promesas
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.execute(query)
      .then(([results]) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = router;
