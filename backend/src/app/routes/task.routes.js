const express = require('express');
let router = express.Router();
const {
    body,
    param
} = require('express-validator');
const TaskController = require('../controllers/task.controller');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, TaskController.get)
    .post(AuthController.checkAuth, [body('description').isString(),
        body('complete').isBoolean(),
        // body('date').isISO8601(),
    ], TaskController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], TaskController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], TaskController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], TaskController.delete);

module.exports = router;