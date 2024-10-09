import express from "express";
import {
  loginUser,
  registerUser,
  testAPI,
} from "../controllers/authContoller.js";
import {
  userValidation,
} from "../validations/userValidation.js";
import { loginValidation } from "../validations/authValidation.js";

const router = express.Router();

//test API
router.get("/", (req, res) => {
  res.send("Auth route test API");
});
router.post("/testapi", testAPI);

//registerUser API
router.post("/registerUser", userValidation, registerUser);

//loginUser API
router.post("/loginUser", loginValidation, loginUser);

export default router;
