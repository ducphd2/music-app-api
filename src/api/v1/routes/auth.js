const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
/**
 * TODO: /auth/register
 */
router.post("/register", userController.createUser);

/**
 * TODO: /auth/login
 */
router.post("/login", userController.login);
module.exports = router;
