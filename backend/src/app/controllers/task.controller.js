const Task = require('../models/task.model');
const {
    validationResult
} = require('express-validator');
const TaskMessages = require("../messages/task.messages");

exports.get = (req, res) => {
    Task.find(req.query, (error, tasks) => {
        if (error) throw error;

        let message = TaskMessages.success.s2;

        if (tasks.length < 0)
            message = TaskMessages.success.s5;

        message.body = tasks;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Task({
        description: req.body.description,
        date: req.body.date,
        complete: req.body.complete
    }).save((error, task) => {
        if (error) throw error;
        let message = TaskMessages.success.s0;
        message.body = task;
        return res.status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Task.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, task) => {
        if (error) throw error;
        if (!task) return res.status(TaskMessages.error.e0.http).send(TaskMessages.error.e0);

        let message = TaskMessages.success.s1;
        message.body = task;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Task.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(TaskMessages.error.e0.http).send(TaskMessages.error.e0);
        return res.status(TaskMessages.success.s3.http).send(TaskMessages.success.s3);

    });
}

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Task.findOne({
        _id: req.params.id
    }, (error, task) => {
        if (error) throw error;
        if (!task) return res.status(TaskMessages.error.e0.http).send(TaskMessages.error.e0);
        let message = TaskMessages.success.s2;
        message.body = task;
        return res.status(message.http).send(message);
    });
}