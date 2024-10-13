import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .isLength({ min: 3, max: 100 })
    .withMessage("Email must be between 3 and 100 characters long"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter (a-z)")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number (0-9)")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      "Password must contain at least one special character (e.g., !, @, #, $)"
    ),
];

export const tokenValidation = [
  body("verificationCode")
    .isInt()
    .withMessage("Verification code must be an integer")
    .isLength({ min: 6, max: 6 })
    .withMessage("Verification code must be exactly 6 digits"),
];
