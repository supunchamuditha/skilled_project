import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/companyRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

//Test the API
app.get("/", (req, res) => {
  res.send("root");
});

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);

export default app;