import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail() // Stops further validation if this fails
    .isLength({ min: 3, max: 100 })
    .withMessage("Email must be between 3 and 100 characters long"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail() // Stops further validation if this fails
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter (a-z)")
    .bail() // Stops further validation if this fails
    .matches(/\d/)
    .withMessage("Password must contain at least one number (0-9)")
    .bail() // Stops further validation if this fails
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      "Password must contain at least one special character (e.g., !, @, #, $)"
    ),
];
