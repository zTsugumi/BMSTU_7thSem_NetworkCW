const User = require('../models/user');
const bcrypt = require('bcrypt');

function findAll() {
  return User.find().exec();
}

function findOne(creds) {
  return User.findOne(creds).exec();
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
  create
}