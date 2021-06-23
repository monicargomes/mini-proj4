const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../../config/config');

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.task, taskSchema);