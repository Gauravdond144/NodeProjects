const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    houseName :{
        type : String,
        required : true,
        unique : true,

    },
    Price :{
        type :Number,
        required : true,
    },
    location: {
        type : String
    },
    image_url : {
        type : String,
        required : false,
        unique: true
    },
    rating :{
        type : Number,
    }
    
});

module.exports =mongoose.model("home", homeSchema);