const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { deletePermission } = require("../Services/permissionService");

const Routes = Router();

// Only Access the Logged Users
Routes.use(protect);

Routes.route("/:id").put((req, res, next) => {
  const model = req.model;
  deletePermission(model)(req, res, next);
});

module.exports = Routes;
