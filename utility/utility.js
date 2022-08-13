const ether = require('ethers')

const hexToInt = (data)=>{
    return parseInt(data.toHexString(),16).toString()
}
module.exports={hexToInt}