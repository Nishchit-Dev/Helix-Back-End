const mongoose = require('mongoose')
const Model = new mongoose.Schema({
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    },
    TnxHash:{
        type:String,
        required:true
    },
    Status:{
        type:Number,
        required:true
    },
    Value:{
        type:String,
        required:true
    },
    GasFees:{
        type:String,
        required:true
    }
},{timestamps:true})

let TransactionModel = mongoose.model("TransactionModel",Model)

module.exports={TransactionModel}