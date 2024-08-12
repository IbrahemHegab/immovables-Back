const { check } = require("express-validator");

const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");
const createUsersModel = require("../Modules/createUsers");

// const createUsersModel = require("../modules/createUsers");

exports.createEmployeesValidation = [
  check("identity").notEmpty().withMessage("is required identity"),
  check("name").notEmpty().withMessage("is required identity"),

  MiddlewareValidator,
];
