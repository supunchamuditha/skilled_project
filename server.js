import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

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

app.listen(PORT, IP, () => {
  console.log(`Server is running on IP ${IP} & port ${PORT}`);
});
