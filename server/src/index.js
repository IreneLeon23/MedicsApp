const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8080";
const authRoutes = require("./routes/auth");
const getOrdenes = require("./routes/getOrdenes");
const getReportes = require("./routes/getReportes");
const getCotizacion = require("./routes/getCotizacion");
const getUser = require("./routes/getUser");
const getProduct = require("./routes/getProduct");
const getExpedientes = require("./routes/getExpedientes");
const getClient = require("./routes/getClient")
const postOrdenes = require("./routes/postOrden")
const putOrden = require("./routes/putOrden");
const postTrabajos = require("./routes/postTrabajos")
const getTrabajos = require("./routes/getTrabajos")
//Admin
const getAdminClients = require("./routes/getAdminClien")
const getAdminUsers = require("./routes/getAdminUs")
const postNewUsuarios = require("./routes/postNusuarios")
const putClient = require("./routes/putClient")
const putUser = require("./routes/putUser")
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Servidor arriba");
});

app.use("/auth", authRoutes);
//Obtener datos para tablas de taller
app.use("/workshop", getOrdenes);
app.use("/workshop", getExpedientes);
app.use("/workshop",getCotizacion);
app.use("/workshop",getReportes);
app.use("/workshop",getTrabajos)

app.use("/users", getUser);
app.use("/products", getProduct);
app.use("/clientes", getClient)

//Envio de formularios
app.use("/orders", postOrdenes)
app.use("/orders", putOrden)
app.use("/trabajos", postTrabajos)

//Peticiones para administrador
app.use("/admin", getAdminClients)
app.use("/admin", getAdminUsers)
app.use("/admin", postNewUsuarios)
app.use("/admin", putClient)
app.use("/admin", putUser)

app.listen(port, () => {
  console.log(`HelloNode app listening on port ${port}!`);


});
