const ethers = require("ethers");
const userModel = require('../model/userAccoutModel')
const fetchBalance = async (data) => {
  let provider = new ethers.providers.InfuraProvider("rinkeby");
  
  let address = await findWalletAddress(data.Email);
    console.log(data.Email)

  return await provider.getBalance(address).then(res=>{
    console.log(res)

    let balance = parseInt(res.toHexString(),16).toString()
    balance = ethers.utils.formatEther(balance)
    console.log("final :",balance)
    return balance
  });
};

const findWalletAddress = async (data) => {
  return userModel.UserModel.findOne({ Email: data }).then((res) => {
    console.log(res);
    return res.address;
  });
};


module.exports={fetchBalance}