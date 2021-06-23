const express = require('express');
let router = express.Router();
const {
    body,
    param
} = require('express-validator');
const TaskController = require('../controllers/task.controller');

router.route('/')
    .get(TaskController.get)
    .post([body('description').isString(),
        body('complete').isBoolean(),
        // body('date').isISO8601(),
    ], TaskController.create);

router.route('/:id')
    .get([param("id").isMongoId()], TaskController.getOne)
    .put([param("id").isMongoId()], TaskController.update)
    .delete([param("id").isMongoId()], TaskController.delete);

module.exports = router;