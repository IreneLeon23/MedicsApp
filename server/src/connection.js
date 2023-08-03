const mysql = require("mysql2");
require("dotenv").config({ path: "../.env.dev" });
const serverIP = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connection = mysql.createPool({
  host: serverIP,
  port: 3306,
  user: "user",
  password: "password",
  database: "new_taller",
  multipleStatements: true,
});
// Verificar la conexión
connection.getConnection((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos.");
    // Aquí puedes realizar otras operaciones con la base de datos si es necesario
  }
});
module.exports = connection;
