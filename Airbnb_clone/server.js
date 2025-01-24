const express = require("express");
const { hostRouter } = require("./Routes/Host.js");
const userRouter = require("./Routes/user.js");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Homes')
    .then(console.log("Connected to database"))
    .catch((err)=>{
      console.log("Error in connecting to database :",err);
    });

app.set("view engine", "ejs");
app.set("views", "./views");


app.use(userRouter);
app.use(hostRouter);


app.listen(3000, () => {
  console.log("server started");
});
