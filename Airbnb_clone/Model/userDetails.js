const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
        name: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });

module.exports =mongoose.model("userDetails", userDetails);