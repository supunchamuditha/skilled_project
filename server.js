import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import companyRouter from "./routers/companyRouter.js";
import postRouter from "./routers/postRouter.js";
import applicationRouter from "./routers/applicationRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 5000;

//test API
app.get("/api", (req, res) => {
  res.send("API is working");
});

//Auth route
app.use("/api/auth", authRouter);

//User route
app.use("/api/user", userRouter);

//Company route
app.use("/api/company", companyRouter);

//Post route
app.use("/api/post", postRouter);

//application route
app.use("/api/application", applicationRouter);

app.listen(PORT, IP, () => {
  console.log(`Server is running on IP ${IP} & port ${PORT}`);
});
