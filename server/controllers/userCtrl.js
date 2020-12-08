const UserRepo = require('../repo/userRepo');
const utils = require('../helpers/utils');
const auths = require('../helpers/auth');

// WIP: admin verification
async function findAll(req, res) {
  try {
    await UserRepo.findAll()
      .then((users) => utils.sendJsonResponse(res, 200, users))
      .catch((err) => utils.sendJsonResponse(res, 500, err));
  }
  catch (err) {
    console.log(err)
  };
}

// WIP: email verification
async function signup(req, res) {
  try {
    const body = await utils.bodyParser(req);
    const newUser = {
      email: body.email,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
      role: body.role,
    }

    await UserRepo.create(newUser)
      .then(
        (user) => {
          //sendEmail(user.email, user.name, null, "welcome");
          user.password = undefined;    // password already saved in db
          utils.sendJsonResponse(res, 200, { success: true })
        },
        (err) => utils.sendJsonResponse(res, 403, { success: false, err: err.message })
      )
      .catch((err) => utils.sendJsonResponse(res, 500, { success: false, err: err.message }))
  }
  catch (err) {
    console.log(err);
  };
}

// WIP: if possible, change this callback hell to promise
async function signin(req, res) {
  try {
    const body = await utils.bodyParser(req);
    await UserRepo.findOne({ email: body.email })
      .then(
        (user) => {         // Mongoose always return something, even null
          if (user) {
            user.comparePassword(body.password, (err, isMatched) => {
              if (!isMatched)
                return utils.sendJsonResponse(res, 401, { success: false, message: "Auth failed: Wrong password" });

              user.generateToken((err, user) => {
                if (!err) {
                  const cookie = [
                    `w_authExp=${user.tokenExp}`,
                    `w_auth=${user.token}`
                  ];

                  utils.sendJsonResponse(res, 200, { success: true }, cookie);
                }
              });
            });
          }
          else
            utils.sendJsonResponse(res, 404, { success: false, message: "Auth failed: Email not found" });
        }
      )
      .catch((err) => utils.sendJsonResponse(res, 500, { success: false, err: err.message }));
  }
  catch (err) {
    console.log(err);
  }
}

async function auth(req, res) {
  try {
    await auths.auth(req, res)
      .then(
        (user) => {
          utils.sendJsonResponse(res, 200, {
            success: true,
            isAdmin: user.role === 0 ? false : true,
            email: user.email,
            firstname: user.name,
            lastname: user.lastname,
            role: user.role,
            image: user.image,
          });
        }
      )
      .catch((err) => utils.sendJsonResponse(res, 401, { success: false, message: "Auth failed" }));
  }
  catch (err) {
    console.log(err);
  };
}

module.exports = {
  findAll,
  signup,
  signin,
  auth
}