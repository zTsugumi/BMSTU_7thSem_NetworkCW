const UserRepo = require('../repo/userRepo');
const utils = require('../helpers/utils');

// WIP: admin verification
async function findAll(req, res) {
  try {
    UserRepo.findAll()
      .then((users) => utils.sendJsonResponse(res, 200, users))
      .catch((err) => utils.sendJsonResponse(res, 500, err));
  }
  catch (err) {
    console.log(err)
  };
}

// WIP: email verification, slow
async function signup(req, res) {
  try {
    const body = await utils.bodyParser(req);
    const newUser = {
      email: body.email,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
      role: body.role,
      image: body.image
    }

    UserRepo.create(newUser)
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

async function signin(req, res) {
  try {
    const body = await utils.bodyParser(req);
    UserRepo.findOne({ email: body.email })
      .then(
        (user) => {         // Mongoose always return something, even null
          if (user) {
            user.comparePassword(body.password, (err, isMatched) => {
              if (!isMatched)
                return utils.sendJsonResponse(res, 401, { success: false, message: "Auth failed: Wrong password" });

              user.generateToken((err, user) => {
                if (!err) {
                  const cookies = [
                    `w_authExp=${user.tokenExp}`,
                    `w_auth=${user.token}`
                  ];

                  utils.sendJsonResponse(res, 200, { success: true }, cookies);
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

async function signout(req, res) {
  try {
    const cookies = await utils.cookiesParser(req);
    const token = cookies.w_auth;

    UserRepo.updateByToken(token, { token: "", tokenExp: "" }, (err, user) => {
      if (user) {
        const cookies = [
          `w_authExp=`,
          `w_auth=`
        ];
        utils.sendJsonResponse(res, 204, { success: true }, cookies);
      }
      else {
        utils.sendJsonResponse(res, 500, { success: false, err: 'Logout failed' });
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

// WIP: auth slow on unauthorized login
async function auth(req, res) {
  try {
    const cookies = await utils.cookiesParser(req);
    const token = cookies.w_auth;

    UserRepo.findByToken(token, (err, user) => {
      if (user)
        utils.sendJsonResponse(res, 200, {
          success: true,
          isAdmin: user.role === 0 ? false : true,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          image: user.image,
        })
      else
        utils.sendJsonResponse(res, 401, { success: false, message: "Auth failed" });
    });
  }
  catch (err) {
    console.log(err);
  };
}

module.exports = {
  findAll,
  signup,
  signin,
  signout,
  auth
}