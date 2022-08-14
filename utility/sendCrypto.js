const ether = require('ethers')
const { AddTransaction } = require('../DB_operation/Transction')
const { UserModel } = require('../model/userAccoutModel')
const walletModel = require('../model/walletModel')
const { hexToInt } = require('./utility')
const send = async(data,tx)=>{
    // https://rinkeby.infura.io/v3/b4c94f7cc5ca45df98ca610e9c6e86b7

    let provider = new ether.providers.InfuraProvider('rinkeby')

    // let privateKey =await findWalletPrivateKey(tx.send_account)
    let privateKey = data.privateKey
    let wallet = new ether.Wallet(privateKey)

    let walletSigner = wallet.connect(provider)
    let gasLimit =  "0x100000"
    let gas = provider.getGasPrice()
    let gasInWei =await gas.then(res=>{
        return hexToInt(res)
    })

    let ENS_add=null
    if(tx.to_address.endsWith('.eth')){
        ENS_add = await findWalletAddress(tx.to_address.substring(0,tx.to_address.length-4)).then(res=>{
            return res
        })
    }

    const tnx = {
        from:tx.send_account,
        to:ENS_add || tx.to_address,
        value:ether.utils.parseEther(tx.send_Token_amount),
        nonce:provider.getTransactionCount(tx.send_account,"latest"),
        gasLimit:ether.utils.hexlify(gasLimit),
        gasPrice:gas
    }

   return walletSigner.sendTransaction(tnx).then(res=>{
        console.log(res)
       
        return res.wait().then(r=>{
            console.log(r)
            let data = {
                BeforeTranscation:res,
                AfterTransaction:r
            }

            let newTnx = {
                From:res.from,
                To:res.to,
                TnxHash:r.transactionHash,
                Status:r.status,
                Value:tx.send_Token_amount,
                GasFees:gasInWei
            }

            AddTransaction(newTnx).then(res=>{
                console.log(res)
            })

            return data
        })
    })
}

const findWalletPrivateKey =async (address)=>{
   return walletModel.walletModel.findOne({address:address}).then(res=>{
        console.log(res)
        return res
    })
}
const findWalletAddress =async (username)=>{
    return UserModel.findOne({Username:username}).then(res=>{
            console.log(res)
        return res.address
    })
}

module.exports={send}