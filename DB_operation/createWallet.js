const walletModel = require('../model/walletModel')
const joi = require('joi')
const usermodel = require("../model/userAccoutModel");
const ethers = require('ethers')

const Schema = joi.object({
    address:joi.string().required(),
    privateKey:joi.string().required(),
    publicKey:joi.string().required(),
    menmonic:joi.string().required(),
})

const validate = (data)=>{
    return Schema.validate(data)
}

const createWallet = async()=>{
    let wallet = ethers.Wallet.createRandom()

    let newWallet = new walletModel.walletModel({
        address:wallet.address,
        privateKey:wallet.privateKey,
        publicKey:wallet.publicKey,
        menmonic:wallet._mnemonic()
    })
    // console.log(data.Email)
    await newWallet.save()

    return newWallet
}

module.exports={ createWallet }