import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

//Test the API
app.get("/", (req, res) => {
  res.send("root");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
