const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8080";
const connection = require("./connection");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hola c;");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => {
  console.log(`HelloNode app listening on port ${port}!`);

  // Evento 'connect' para verificar la conexión exitosa
  connection.on("connect", () => {
    console.log("Conexión exitosa a la base de datos");
  });
});
