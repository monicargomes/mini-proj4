const express = require('express');
let router = express.Router();
const AuthController = require('../controllers/auth.controller');
const {
    body
} = require('express-validator');

router.route('/')
    .post([body('username').isAlphanumeric(),
        body('password').isString()
    ], AuthController.login)

module.exports = router;