import { body } from "express-validator";

export const companiesValidation = [
  body("name")
    .isString()
    .withMessage("Company name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Email must be at most 100 characters"),

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters"),

  body("phone")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .isLength({ max: 100 })
    .withMessage("Phone number must be at most 100 characters"),

  body("industry")
    .isString()
    .withMessage("Industry must be a string")
    .isLength({ max: 100 })
    .withMessage("Industry must be at most 100 characters"),

  body("logo").custom((value, { req }) => {
    if (!value) {
      return true; // If the logo is empty, that's allowed
    }
    // Check if it's a valid image format (JPEG, PNG, etc.)
    if (
      !["image/jpeg", "image/png", "image/gif"].includes(req.body.logo.mimetype)
    ) {
      throw new Error("Logo must be a valid image format (JPEG, PNG, GIF)");
    }
    return true;
  }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
