const express = require("express");
const router = express.Router();
const connection = require("../connection");


router.get("/cotizacion", (req, res) => {
    const sql=
    'SELECT oc.folio, (SELECT c.nombre FROM clientes AS c WHERE c.clave_cliente = oc.fk_cliente) AS nombre_cliente, MAX(oc.estatus_orden) AS estatus_orden, MAX(oc.fecha_captura) AS fecha_captura, MAX(oc.fecha_compromiso) AS fecha_compromiso, MAX(oc.comentario_cotizacion) AS comentario_cotizacion, MAX(oc.equipo) AS equipo, (SELECT u.nombre FROM usuarios AS u WHERE u.clave_usuario = oc.fk_usuario) AS nombre_usuario FROM orden_cotizacion AS oc GROUP BY oc.folio;'; 
    
    

    connection.query(sql, (err, results) => {
        if (err) {
          console.error("Error al obtener las órdenes de servicio:", err);
          res.status(500).json({ error: "Error al obtener las órdenes de servicio" });
          return;
        }
    
        // Enviar las órdenes de servicio obtenidas como respuesta
        res.json(results);
      });
    });
    
    module.exports = router;