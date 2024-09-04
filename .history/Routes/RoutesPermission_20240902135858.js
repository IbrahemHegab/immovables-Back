const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { deletePermission } = require("../Services/permissionService");

const Routes = Router();

// Only Access the Logged Users
Routes.use(protect);


Routes.route("/").put( deletePermission)

module.exports = Routes;
