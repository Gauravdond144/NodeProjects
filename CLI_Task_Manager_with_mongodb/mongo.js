const mongoose = require('mongoose');


const url = "mongodb://127.0.0.1:27017/mydb";

async function main(){
    try{
        await mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology :true});
        console.log("connected to mongodb with mongoose");

        const userSchema = new mongoose.Schema({
            name : String,
            age : Number,
        });

        const user = mongoose.model("user", userSchema);

        const newUser = new user({name: "gaurav",age : 25});
        const savedUser = await newUser.save();
        console.log("Document saved", savedUser);
        
    }catch(err){
        console.log(err);
    }
    

}
main();