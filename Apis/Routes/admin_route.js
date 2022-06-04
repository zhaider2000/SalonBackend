"use strict";
const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/admin_controller");

router.post("/registration", AdminController.create_admin);
router.post("/signin", AdminController.login_admin);

module.exports = router;
