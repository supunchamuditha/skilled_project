import { validationResult } from "express-validator";

const validateMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error
        .array()
        .map((error) => error.msg)
        .join("||"),
    });
  }

  next();
};

export default validateMiddleware;