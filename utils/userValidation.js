import { body } from "express-validator";

export const userValidationRules = [
  // validate the request body
  body("name")
    .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/)
    .withMessage("Name must contain only letters")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required").normalizeEmail(), // email must be an email
  body("phone")
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage(
      "Phone number must be a valid format (e.g., (234) 298-8956 or +19479561896)"
    )
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 to 15 digits"), // phone number must be a valid format and between 10 to 15 digits
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[\W_]/)
    .withMessage(
      "Password must contain at least one special character (e.g. @, #, $, etc.)"
    ), // password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character
  body("profile_picture").isURL().withMessage("Profile picture must be a URL"), // profile picture must be a URL
];

export const loginValidationRules = [
  // validate the request body
  body("email").isEmail().withMessage("Email is required").normalizeEmail(), // email must be an email
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[\W_]/)
    .withMessage(
      "Password must contain at least one special character (e.g. @, #, $, etc.)"
    ), // password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character
];
