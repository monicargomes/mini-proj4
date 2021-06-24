const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const JWT = require("jsonwebtoken");
const CONFIG = require("../../config/config");
const UserMessages = require("../messages/user.messages");

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        _id: req.params.id
    }, (error, task) => {
        if (error) throw error;
        if (!task) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);
        let message = UserMessages.success.s2;
        message.body = task;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new User({
        username: req.body.username,
        password: req.body.password
    }).save((error, task) => {
        if (error) throw error;
        let message = UserMessages.success.s0;
        message.body = task;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        username: req.body.username
    }, (error, user) => {
        if (error) throw error;
        if (user) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0)

        new User({
            username: req.body.username,
            password: req.body.password
        }).save((error, user) => {
            if (error) throw error;

            let payload = {
                pk: user.public_key
            }

            let options = {
                expiresIn: CONFIG.auth.expiration_time,
                issuer: CONFIG.auth.issuer
            };

            let token = JWT.sign(payload, user.private_key, options);


            let message = UserMessages.success.s0;
            message.body = user;
            return res.header("location", "/users/" + user._id).header("Authorization", token).status(message.http).send(message);
        })
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, task) => {
        if (error) throw error;
        if (!task) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);

        let message = UserMessages.success.s1;
        message.body = task;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);
        return res.status(UserMessages.success.s3.http).send(UserMessages.success.s3);

    });
}