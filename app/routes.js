const express = require("express");
const app     = express();

app.use("/v1/", require("./User/router"));
app.use("/v1/", require("./Worker/router"));

module.exports = app;
