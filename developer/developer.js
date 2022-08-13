const walletModel = require('../model/userAccoutModel')
const userUtility = require('../model/walletModel')


const fun = async()=>{

    await walletModel.UserModel.deleteMany().then(res=>{
        console.log(res)
    });
    await userUtility.walletModel.deleteMany(res=>{
        console.log(res)
    });

}

module.exports={fun}
