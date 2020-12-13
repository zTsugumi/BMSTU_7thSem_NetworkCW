const http = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');
const morgan = require('morgan');
const config = require('./config/key');
const utils = require('./helpers/utils');
const cors = require('./helpers/cors');
const userCtrl = require('./controllers/userCtrl');
const chatCtrl = require('./controllers/chatCtrl');

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

var logger = morgan('dev');

/**
 * Create HTTP server + REST api
 */
var server = http.createServer((req, res) => {
  logger(req, res, (err) => {
    // Setup cors
    //cors.cors(req, res);
    cors.corsWithOptions(req, res);

    switch (req.url) {
      case '/api/users':
        switch (req.method) {
          case 'OPTIONS':
            // WIP
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'GET':
            // WIP add admin verification
            userCtrl.findAll(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      case '/api/users/signup':
        switch (req.method) {
          case 'OPTIONS':
            // WIP
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'POST':
            // WIP email verification
            userCtrl.signup(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      case '/api/users/signin':
        switch (req.method) {
          case 'OPTIONS':
            // WIP
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'POST':
            userCtrl.signin(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      case '/api/users/signout':
        // WIP
        switch (req.method) {
          case 'OPTIONS':
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'GET':
            userCtrl.signout(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      case '/api/users/auth':
        switch (req.method) {
          case 'OPTIONS':
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'GET':
            userCtrl.auth(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      case '/api/chat':
        switch (req.method) {
          case 'OPTIONS':
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'GET':
            chatCtrl.findAll(req, res);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;

      default:
        utils.sendJsonResponse(res, 404, 'Resource not found');
    }
  })
})

/**
 * Make server listen
 */
server.listen({ host: config.hostname, port: config.port }, () => {
  console.log(`Server running on http://${config.hostname}:${config.port}`);
});

/**
 * Create WebSocket server for chat interacting
 */
const io = socket(server, {
  cors: {
    origin: `http://${config.hostname}:${config.clientPort}`,
    methods: ['GET', 'POST']
  }
});
io.on('connection', socket => {
  socket.on('client to server',
    msg => {
      chatCtrl.insert(msg)
        .then(
          (newMsg) => {
            socket.emit('server to client', newMsg);
          }
        )
        .catch(err => socket.emit('server error', err));
      ;
    });
});

module.exports = server;