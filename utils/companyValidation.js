import { body } from "express-validator";

export const companyValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .matches(/^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)+$/)
    .withMessage(
      "Company name must contain at least two words and can include letters, numbers, and spaces"
    ),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .custom((value) => {
      const isURL = value.match(
        /https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/
      );
      const isText = value.match(/^[A-Za-z0-9\s,.'-\/]*$/);
      if (!isURL && !isText) {
        throw new Error(
          "Location must be either a valid URL or a valid address"
        );
      }
      return true;
    }),
  body("industry")
    .trim()
    .notEmpty()
    .withMessage("Industry is required")
    .isString()
    .withMessage("Industry must be a valid string"),
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("size")
    .notEmpty()
    .withMessage("Company size is required")
    .isInt()
    .withMessage("Company size must be numeric"),
];
