const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
} = require('express-validator');

router.route('/')
    .post([
        body('username').isAlphanumeric(),
        body('password').isString(),
    ], UserController.create)

module.exports = router;