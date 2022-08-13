
const joi = require('joi')
const { TransactionModel } = require('../model/WalletTransaction')

const validate = (data)=>{
    const Tnx = joi.object({
        From:joi.string().required(),
        To:joi.string().required(),
        TnxHash:joi.string().required(),
        Status:joi.string().required(),
        Value:joi.string().required(),
        GasFees:joi.string().required(),
    })

    return Tnx.validate(data)
}

 const AddTransaction =async (data)=>{
    let validation = validate(data).error

    if(validation){
        
        return {message:validation.details[0].message,flag:false}
    }else{
        let newTnx = new TransactionModel(data)

        await newTnx.save()
        return newTnx
    }
}

module.exports={AddTransaction}