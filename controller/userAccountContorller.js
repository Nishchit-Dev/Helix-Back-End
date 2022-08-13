const User = require("../DB_operation/userUtility");
const { UserModel } = require("../model/userAccoutModel");
const send = require('../utility/sendCrypto')
const fetchBalance = require('../utility/fetechWalletBalance')
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

exports.send = (req,res) => {
    User.Login(req.body).then(
        result=>{
            let data = req.body.tnx;
            send.send(result,data)
        }
    )
};

exports.fetchBalance = async(req,res)=>{
    console.log(req.body)
    
    fetchBalance.fetchBalance(req.body).then(result=>{
        res.send(result)
    })
}
