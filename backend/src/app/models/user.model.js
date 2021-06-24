const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../../config/config");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  public_key: String,
  private_key: String,
});

userSchema.pre("save", function (callback) {
  this.public_key = Math.random().toString(36).substring(2) + this._id;
  this.private_key = Math.random().toString(36).substring(2) + this._id;

  this.password = bcrypt.hashSync(
    escape(this.password),
    bcrypt.genSaltSync(2)
  );

  callback();
});

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.user,
  userSchema
);
