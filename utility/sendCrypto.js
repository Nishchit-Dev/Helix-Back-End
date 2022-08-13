const ether = require('ethers')
const walletModel = require('../model/walletModel')
const send = async(data,tx)=>{
    // https://rinkeby.infura.io/v3/b4c94f7cc5ca45df98ca610e9c6e86b7

    let provider = new ether.providers.InfuraProvider('rinkeby')

    let privateKey =await findWalletPrivateKey(tx.send_account)
    let wallet = new ether.Wallet(privateKey)

    let walletSigner = wallet.connect(provider)
    let gasLimit =  "0x100000"
    let gas = provider.getGasPrice()


    const tnx = {
        from:tx.send_account,
        to:tx.to_address,
        value:ether.utils.parseEther(tx.send_Token_amount),
        nonce:provider.getTransactionCount(tx.send_account,"latest"),
        gasLimit:ether.utils.hexlify(gasLimit),
        gasPrice:gas
    }

    walletSigner.sendTransaction(tnx).then(res=>{
        console.log(res)
        res.wait().then(r=>{
            console.log(r)
        })
    })
}

const findWalletPrivateKey =async (address)=>{
   return walletModel.walletModel.findOne({address:address}).then(res=>{
        console.log(res)
        return res
    })
}

module.exports={send}