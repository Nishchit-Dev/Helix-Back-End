const User = require("../DB_operation/userUtility");
const { UserModel } = require("../model/userAccoutModel");
const send = require('../utility/sendCrypto')
const fetchBalance = require('../utility/fetechWalletBalance');
const { FetchAllTnx } = require("../DB_operation/Transction");
exports.signup = (req, res) => {
  User.CreateAccount(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.login = (req, res) => {
  User.Login(req.body)
    .then((re) => {
      res.send(re);
    })
    .catch((err) => res.send(err));
};

exports.send = (req,resp) => {
    User.WalletSend(req.body.tnx).then(
        result=>{
            send.send(result,req.body.tnx).then(res=>{
                resp.send(res)
            })
        }
    )
};

exports.fetchBalance = async(req,res)=>{
    console.log(req.body)

    fetchBalance.fetchBalance(req.body).then(result=>{
        res.send(result)
    })
}

exports.FetchTnx = async(req,res)=>{
  FetchAllTnx(req.body).then(resp=>{
    console.log(resp)
    res.send(resp)
  })
}