const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8080";
const connection = require("./connection");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const getOrdenes = require("./routes/getOrdenes");
const getReportes = require("./routes/getReportes");
const getCotizacion = require("./routes/getCotizacion");
const getUser = require("./routes/getUser");
const getProduct = require("./routes/getProduct");
const getExpedientes = require("./routes/getExpedientes");
const getClient = require("./routes/getClient")
const postOrdenes = require("./routes/postOrden")
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Servidor arriba");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/workshop", getOrdenes);
app.use("/workshop", getExpedientes);
app.use("/workshop",getCotizacion);
app.use("/workshop",getReportes);
app.use("/users", getUser);
app.use("/products", getProduct);
app.use("/orders", postOrdenes)
app.use("/clientes", getClient)

app.listen(port, () => {
  console.log(`HelloNode app listening on port ${port}!`);


});
