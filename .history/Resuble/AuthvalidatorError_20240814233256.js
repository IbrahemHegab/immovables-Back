const { check } = require("express-validator");

const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");

exports.LoginValidator = [
  check("password")
    .notEmpty()
    .withMessage("is required Password")
  check("name").notEmpty().withMessage("is required Name"),

  MiddlewareValidator,
];
