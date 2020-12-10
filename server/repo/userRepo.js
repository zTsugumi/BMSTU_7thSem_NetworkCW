const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config/key');
const jwt = require('jsonwebtoken');

function findAll() {
  return User.find().exec();
}

function findOne(creds) {
  return User.findOne(creds).exec();
}

function findByToken(token, callback) {
  jwt.verify(token, config.secretKey, (err, decode) => {
    if (err) return callback(err);

    const filter = { "_id": decode._id, "token": token };

    User.findOne(filter, (err, user) => {
      if (err) return callback(err);
      callback(null, user);
    })
  })
}

async function updateByToken(token, update, callback) {
  jwt.verify(token, config.secretKey, (err, decode) => {
    if (err) return callback(err);

    const filter = { "_id": decode._id, "token": token };

    User.findOneAndUpdate(filter, update, { new: true }, (err, user) => {
      if (err) return callback(err);
      callback(null, user);
    });
  });
}

function create(creds) {
  var newUser = new User(creds);

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(newUser.password, salt))
      .then((hash) => {
        newUser.password = hash;
        resolve(newUser.save());
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  findAll,
  findOne,
  findByToken,
  updateByToken,
  create,
}