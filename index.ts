import cookieSession from "cookie-session";
import express from "express";
import productRouter from "./routes/product.router";
import userRouter from "./routes/user.router";
import mySql from "./services/MySql";

const app = express();
const port = 3000;
require("dotenv").config();
(async () => {
  try {
    await mySql.initConnection({ host: "localhost", user: "root", database: "ecommerce", password: "i3rtbblfsmh" });
    console.log("connected as id " + mySql.connection?.threadId);
  } catch (err) {
    console.log(err);
  }
})();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({ signed: false, secure: false }));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
