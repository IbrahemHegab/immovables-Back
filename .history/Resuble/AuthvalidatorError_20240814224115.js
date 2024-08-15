const { check } = require("express-validator");

const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");

exports.LoginValidator = [
  check("password")
    .notEmpty()
    .withMessage("is required Password")
    .withMessage("To Shoort Password To CreateUser Validator"),
  check("name").notEmpty().withMessage("is required E-mail"),

  MiddlewareValidator,
];
