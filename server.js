import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();

//Test the API
app.get("/", (req, res) => {
  res.send("root");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
