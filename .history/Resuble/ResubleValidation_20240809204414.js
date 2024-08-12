exports.getValidator = [
    check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
    MiddlewareValidator,
  ];
  exports.deleteOneUserValidator = [
    check("id").isMongoId().withMessage("Sorry ID Not Available To delete"),
    MiddlewareValidator,
  ];
  exports.updateOneUserValidator = [
    check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
    MiddlewareValidator,
  ];
  exports.deleteOneUserValidator = [
    check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
    MiddlewareValidator,
  ];