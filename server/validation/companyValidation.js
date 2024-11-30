import { body } from "express-validator";

export const companyValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .matches(/^[A-Za-z0-9\s\-\_!@#\$%\^&*()+=]+$/)
    .withMessage(
      "Name can contain letters, numbers, spaces, and special characters such as - _ ! @ # $ % ^ & * ( ) + ="
    ), // Allows letters, numbers, spaces, and specific symbols

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .isLength({ min: 3, max: 100 })
    .withMessage("Email must be between 3 and 100 characters long"),

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),

  body("phone_num")
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

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter (a-z)")
    .matches(/\d/)
    .withMessage("Password must contain at least one number (0-9)")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      "Password must contain at least one special character (e.g., !, @, #, $)"
    ),

  body("logo").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Logo is required");
    }
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      throw new Error("Logo must be a valid image (png, jpg, jpeg, gif)");
    }
    return true;
  }),
];
