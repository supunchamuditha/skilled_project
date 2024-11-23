import { body } from "express-validator";

export const userValidation = [
  body("full_name")
    .isString()
    .withMessage("Full name must be a string")
    .bail() // Stops further validation if this fails
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long")
    .bail() // Stops further validation if this fails
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Full name must only contain letters and spaces"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail() // Stops further validation if this fails
    .isLength({ min: 3, max: 100 })
    .withMessage("Email must be between 3 and 100 characters long"),

  body("phone_num")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters long")
    .bail() // Stops further validation if this fails
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

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .bail() // Stops further validation if this fails
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),

  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be either Male or Female or Other"),

  // Profile picture validation
  body("profile_pic").custom((value, { req }) => {
    if (!req.files || !req.files["profile_pic"]) {
      throw new Error("Profile picture is required");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(req.files["profile_pic"][0].mimetype)) {
      throw new Error(
        "Profile picture must be a valid image (png, jpg, jpeg, gif, webp)"
      );
    }
    return true;
  }),

  // CV validation
  body("cv").custom((value, { req }) => {
    if (!req.files || !req.files["cv"]) {
      throw new Error("CV is required");
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(req.files["cv"][0].mimetype)) {
      throw new Error("CV must be a valid PDF file");
    }
    return true;
  }),

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
