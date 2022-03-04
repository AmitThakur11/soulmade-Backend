const express = require("express");
const cors = require("cors");
const authRoute = require("./route/auth.route");
const productRoute = require("./route/product.route");
const userDataRoute = require("./route/userData.router");
const dbConnect = require("./dbConnect");
require("dotenv").config();
const port = process.env.PORT || 3002;

const app = express();
dbConnect();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("working");
});

app.all(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin , X-Requested-With , Content-Type, Accept")
  next();
})

app.use("/user", authRoute);
app.use("/product", productRoute);
app.use("/user_data", userDataRoute);

app.listen(port, () => console.log(`server running at port : ${port}`));
