const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8080";
const authRoutes = require("./routes/auth");
const Ordenes = require("./routes/Ordenes");
const Expedientes = require("./routes/Expedientes");
const Cotizaciones = require("./routes/Cotizaciones");

const Trabajos = require("./routes/Trabajos");

const getReportes = require("./routes/getReportes");
const getUser = require("./routes/getUser");
const getProduct = require("./routes/getProduct");
const getClient = require("./routes/getClient");

//Admin
const getAdminClients = require("./routes/getAdminClien");
const getAdminUsers = require("./routes/getAdminUs");
const postNewUsuarios = require("./routes/postNusuarios");
const putClient = require("./routes/putClient");
const putUser = require("./routes/putUser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Servidor arriba");
});

app.use("/auth", authRoutes);

app.use("/taller/expedientes", Expedientes);
app.use("/taller/ordenes", Ordenes);
app.use("/taller/cotizaciones", Cotizaciones);
app.use("/taller/trabajos", Trabajos);
app.use("/taller/reportes", getReportes);

app.use("/users", getUser);
app.use("/products", getProduct);
app.use("/clientes", getClient);

//Peticiones para administrador
app.use("/admin", getAdminClients);
app.use("/admin", getAdminUsers);
app.use("/admin", postNewUsuarios);
app.use("/admin", putClient);
app.use("/admin", putUser);

app.listen(port, () => {
  console.log(`HelloNode app listening on port ${port}!`);
});
