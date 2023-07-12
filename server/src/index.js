const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8080";
const connection = require("./connection");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const getOrdenes = require("./routes/getOrdenes");
const getUser = require("./routes/getUser");
const getProduct = require("./routes/getProduct");
const getExpedientes = require("./routes/getExpedientes");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hola c;");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/workshop", getOrdenes);
app.use("/workshop", getExpedientes);
app.use("/users", getUser);
app.use("/products", getProduct);

app.listen(port, () => {
  console.log(`HelloNode app listening on port ${port}!`);


});
