const mongoose = require('mongoose')

const model = new mongoose.Schema({
    address:{
        type:String,
        required:true
    }
    ,privateKey:{
        type:String,
        required:true
    },
    publicKey:{
        type:String,
        required:true
    },
    menmonic:{
        type:Object,
        required:true
    }
},{timestamps:true})

let walletModel = mongoose.model("walletModel",model)

module.exports={ walletModel }