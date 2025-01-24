const express = require('express');
const userRouter = express.Router();
const home = require("../schema");

userRouter.get("/",(req,res) => {  
    const homes = home.find().then(homes => {
        res.render("Home",{pageTitle: "Home","homes":homes});
        })

});

module.exports = userRouter;