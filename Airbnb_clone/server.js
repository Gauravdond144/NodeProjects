const express = require("express");
const { hostRouter } = require("./Routes/Host.js");
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");




app.use(hostRouter);


app.listen(3000, () => {
  console.log("server started");
});
