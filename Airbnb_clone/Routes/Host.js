const express = require('express');
const hostRouter = express.Router();
const bodyParser = require("body-parser");

hostRouter.use(express.urlencoded({extended: true}));
hostRouter.use(express.json());

hostRouter.get("/",(req,res) => {  
    res.render("hostHome",{pageTitle: "Home"});
});

hostRouter.get("/addhome", (req,res) => {
    res.render("addHome",{pageTitle: "Add Home"});
});

hostRouter.post("/addhome",(req,res)=>{
    res.render("homeadded",{pageTitle : "Home added","Details" : req.body});
});

module.exports = {hostRouter :hostRouter};
// akdjk