const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/key');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: '',
    maxlength: 50
  },
  lastname: {
    type: String,
    default: '',
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  }
}, { timestamps: true });

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatched) => {
    if (err) return callback(err);
    callback(null, isMatched);
  });
}

UserSchema.methods.generateToken = function (callback) {
  this.token = jwt.sign(
    { _id: this._id },
    config.secretKey,
    { expiresIn: config.jwtExpiration });
  this.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
}

module.exports = mongoose.model('User', UserSchema);