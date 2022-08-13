const joi = require("joi");
const usermodel = require("../model/userAccoutModel");
const { createWallet } = require("./createWallet");
const ether = require("ethers");
const { walletModel } = require("../model/walletModel");

const Schema = joi.object({
  Username: joi.string().required(),
  Password: joi.string().required(),
  Email: joi.string().required(),
});

let validate = (obj) => {
  return Schema.validate(obj);
};

const CreateAccount = async (data) => {
  let validation = validate(data);

  if (validation.error) {
    return { message: validation.error.details[0].message, flag: false };
  } else {
    let checkEmail = await usermodel.UserModel.exists({ Email: data.Email });
    if (checkEmail) {
      return { message: "user Already exist" };
    } else {
      let wallet = createWallet().then((res) => {
        console.log(res.address);

        let newAccount = new usermodel.UserModel({
          Username: data.Username,
          Password: data.Password,
          Email: data.Email,
          address: res.address,
        });
        return newAccount.save().then((res) => {
          console.log(res);
          return res;
        });
      });

      return wallet;
    }
  }
};

const LoginObject = joi.object({
  Email: joi.string().required(),
  Password: joi.string().required(),
});

const LoginValidation = (obj) => {
  return LoginObject.validate(obj);
};

const Login = async (data) => {
  let validation = LoginValidation(data).error;

  if (validation) {
    return { message: validation.details[0].message, flag: false };
  } else {
    return usermodel.UserModel.findOne({ Email: data.Email }).then((res) => {
      console.log(res);
      return res;
    });
  }
};

const WalletObject = joi.object({
  send_account: joi.string().required(),
  to_address: joi.string().required(),
  send_Token_amount: joi.string().required(),
});

const WalletValidation = (data) => {
  return WalletObject.validate(data);
};

const WalletSend = (data) => {
  let validation = WalletValidation().error;

  console.log(data);
  if (validation) {
    return { message: validation.details[0].message, flag: false };
  } else {
    return walletModel.findOne({ address: data.send_account }).then((res) => {
      console.log(res);
      return res;
    });
  }
};
module.exports = { CreateAccount, Login, WalletSend };
