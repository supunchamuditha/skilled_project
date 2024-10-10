import express from "express";
import {
  loginCompany,
  loginUser,
  registerCompany,
  registerUser,
  testAPI,
} from "../controllers/authContoller.js";
import { userValidation } from "../validations/userValidation.js";
import { loginValidation } from "../validations/authValidation.js";
import { companyValidation } from "../validations/companyValidation.js";

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

//companyRegister API
router.post("/registerCompany", companyValidation, registerCompany);

//companyLogin API
router.post("/loginCompany", loginValidation, loginCompany);

export default router;
