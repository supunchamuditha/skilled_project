import { body } from "express-validator";

export const companyValidation = [
  body("id").isInt().withMessage("ID must be an integer"),

  body("name")
    .isString()
    .withMessage("Company name must be a string")
    .isLength({ min: 3 })
    .withMessage("Company name must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .isLength({ min: 3, max: 100 })
    .withMessage("Email must be between 3 and 100 characters long"),

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),

  body("phone")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters long")
    .custom((value) => {
      const telPattern = /^\+?[0-9]{10,15}$/;

      if (!telPattern.test(value)) {
        throw new Error(
          "Phone number must be a valid telephone number (e.g., +94112345678)."
        );
      }
      return true;
    })
    .withMessage("Phone number must be a valid telephone number"),

  body("industry")
    .isString()
    .withMessage("Industry must be a string")
    .isLength({ min: 2 })
    .withMessage("Industry must be at least 2 characters long"),

  body("logo")
    .isURL()
    .withMessage("Logo must be a valid URL")
    .matches(/\.(png|jpg|jpeg|gif)$/)
    .withMessage("Logo must be a valid image (png, jpg, jpeg, gif)"),

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

  body("date").isISO8601().withMessage("Date must be a valid date"),

  body("status")
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either 'Active' or 'Inactive'"),
];
