import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import logger from "./logger.js";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import companyRouter from "./routers/companyRouter.js";
import postRouter from "./routers/postRouter.js";
import applicationRouter from "./routers/applicationRouter.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  const logMessage = `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, IP: ${req.ip}`;
  logger.info(logMessage);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5000/", // This must match your frontend origin
    credentials: true, // Allow credentials (cookies, tokens)
    methods: "GET,POST,PUT,DELETE", // Add the HTTP methods that your API allows
    // allowedHeaders: 'Content-Type, Authorization' // Add the headers that your API accepts
  })
);
app.use(express.json());
app.use(cookieParser());

const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/Skilled_frontend-master/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Skilled_frontend-master", "dist", "index.html")
  );
});

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

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, IP, () => {
  logger.info(`Server is running on IP ${IP} & port ${PORT}`);
  console.log(`Server is running on IP ${IP} & port ${PORT}`);
});
