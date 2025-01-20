const express = require('express');
const hostRouter = express.Router();
const bodyParser = require("body-parser");
const home = require("../schema");

hostRouter.use(express.urlencoded({extended: true}));
hostRouter.use(express.json());

hostRouter.get("/",(req,res) => {  
    const homes = home.find().then(homes => {
        res.render("hostHome",{pageTitle: "Home","homes":homes});
        })

});

hostRouter.get("/addhome", (req,res) => {
    res.render("addHome",{pageTitle: "Add Home"});
});

hostRouter.post("/addhome",(req,res)=>{
    try{
        const newHome = new home(req.body);
        const savedHome =  newHome.save();
        
    }catch(error){
        console.log("Error in saving Home details :",error);
    }
    res.render("homeadded",{pageTitle : "Home added","Details" : req.body});
});

module.exports = {hostRouter :hostRouter};
