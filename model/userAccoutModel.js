const Mongoose = require("mongoose");
const model = new Mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
}, { timestamps: true });

let UserModel = Mongoose.model("UserModel",model)

module.exports={UserModel}