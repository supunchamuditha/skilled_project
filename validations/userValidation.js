import { body } from "express-validator";

export const userRegValidation = [
  body("full_name")
    .isString()
    .withMessage("Full name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 100 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Email must be at most 100 characters"),

  body("phone_num")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .isLength({ max: 15 })
    .withMessage("Phone number must be at most 15 characters"),

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters"),

  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be either Male, Female, or Other"),

  body("cv").custom((value, { req }) => {
    if (!value) {
      return true; // If CV is empty, that's allowed
    }
    // Check if it's a PDF file (you can improve this with more checks if needed)
    if (req.body.cv.mimetype !== "application/pdf") {
      throw new Error("CV must be a PDF file");
    }
    return true;
  }),

  body("profile_pic").custom((value, { req }) => {
    if (!value) {
      return true; // If profile picture is empty, that's allowed
    }
    // Check if it's a valid image format (JPEG, PNG, etc.)
    if (
      !["image/jpeg", "image/png", "image/gif"].includes(
        req.body.profile_pic.mimetype
      )
    ) {
      throw new Error(
        "Profile picture must be a valid image format (JPEG, PNG, GIF)"
      );
    }
    return true;
  }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const userLoginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Email must be at most 100 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
