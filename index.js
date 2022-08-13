const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Routes = require("./routes/routes");
const bodyParser = require("body-parser");
const { fun } = require("./developer/developer");
const cors =  require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const connectMongo = async () => {
  let url = process.env.DB_URL;

  return mongoose
    .connect(url)
    .then((res) => {
      let port = process.env.PORT;
      return app.listen(port, () => {
        return "connected";
      });
    })
    .catch((err) => {
      return err;
    });
};

connectMongo()
  .then((res) => {
    console.log(res);
    // fun()
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", Routes.routes);
