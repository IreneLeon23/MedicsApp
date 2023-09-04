const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../.env.dev" });
const serverIP = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  host: serverIP,
  port: 3306,
  user: dbUser,
  password: dbPassword,
  database: "new_taller",
});

// Verificar la conexión
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos.");
    conn.release(); // Liberar la conexión después de la verificación
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
})();

module.exports = pool;
