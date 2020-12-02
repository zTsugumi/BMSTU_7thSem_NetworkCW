const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/key');
const utils = require('./helpers/utils');
const userCtrl = require('./controllers/userCtrl');

/**
 * Connect to mongodb through mongoose
 */
var connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => console.log(err));

/**
 * Create HTTP server + REST api
 */
var server = http.createServer((req, res) => {
  switch (req.url) {
    case "/api/users":
      switch (req.method) {
        case 'GET':
          // WIP add admin verification
          userCtrl.findAll(req, res);
          break;
        default:
          utils.sendJsonResponse(res, 501, { err: "Not implemented" });
      }
      break;

    case "/api/users/signup":
      switch (req.method) {
        case 'POST':
          // WIP email verification
          userCtrl.create(req, res);
          break;
        default:
          utils.sendJsonResponse(res, 501, { err: "Not implemented" });
      }
      break;
    case "/api/users/signin":
      switch (req.method){
        case 'POST':
          userCtrl.signin(req, res);
          break;
        default:
          utils.sendJsonResponse(res, 501, { err: "Not implemented" });
      }
      break;
    case "/api/users/signout":
      // WIP
      break;
    default:
      utils.sendJsonResponse(res, 404, "Resource not found");
  }
})

/**
 * Make server listen
 */
server.listen({ host: config.hostname, port: config.port }, () => {
  console.log(`Server running on http://${config.hostname}:${config.port}`);
});

module.exports = server;