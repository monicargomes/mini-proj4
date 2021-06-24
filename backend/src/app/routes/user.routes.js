const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
    param
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([
        body('username').isAlphanumeric(),
        body('password').isString(),
    ], UserController.create)
    .get(AuthController.checkAuth, UserController.get);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], UserController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], UserController.delete);

module.exports = router;