const joi = require("joi");
const TransactionModel = require("../model/WalletTransaction");

const validate = (data) => {
  const Tnx = joi.object({
    From: joi.string().required(),
    To: joi.string().required(),
    TnxHash: joi.string().required(),
    Status: joi.number().required(),
    Value: joi.string().required(),
    GasFees: joi.string().required(),
  });

  return Tnx.validate(data);
};

const AddTransaction = async (data) => {
  let validation = validate(data).error;

  if (validation) {
    return { message: validation.details[0].message, flag: false };
  } else {
    let newTnx = new TransactionModel.TransactionModel(data);

    return await newTnx.save().then((res) => {
      return newTnx;
    });
  }
};

const FetchTnx = joi.object({
  add: joi.string().required(),
});

const ValidateTnx = (data) => {
  return FetchTnx.validate(data);
};

const FetchAllTnx = async (data) => {
  let validation = ValidateTnx(data).error;

  if (validation) {
    return { message: validation.details[0].message, flag: false };
  } else {
    let cursor = [];
    console.log(data);
    await TransactionModel.TransactionModel.db.collection("transactionmodels").aggregate([
        {
          $match:{
            To:data.add
          },
        },{
            $project:{
                _id:0,
                To:1,
                From:1,
                TnxHash:1,
                Status:1,
                Value:1,
                GasFees:1
            }
        },
      ]).forEach(ele=>{
        cursor.push(ele)
      })

    return await TransactionModel.TransactionModel.db
      .collection("transactionmodels")
      .aggregate([
        {
          $match:{
            From:data.add
          },
        },{
            $project:{
                _id:0,
                To:1,
                From:1,
                TnxHash:1,
                Status:1,
                Value:1,
                GasFees:1
            }
        },
      ]).forEach(ele=>{
        cursor.push(ele)
        console.log(ele)
      }).then(res=>{
        return cursor.reverse()
      });
  }
};

module.exports = { AddTransaction, FetchAllTnx };
