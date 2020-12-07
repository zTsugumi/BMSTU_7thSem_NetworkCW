const UserRepo = require('../repo/userRepo');
const utils = require('./utils');

async function auth(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const cookies = await utils.cookiesParser(req);
      const token = cookies.w_auth;

      UserRepo.findByToken(token, (err, user) => {
        if (err) throw err;

        if (!user)
          return reject(null);

        resolve(user);
      });
    }
    catch (err) {
      reject(err);
    }
  });
};

module.exports = { auth };