const https = require('https');
const mongoose = require('mongoose');
const fs = require('fs');
//const multer = require('multer')
const formidable = require('formidable');
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

var secPort = normalizePort(config.secPort);
var options = {
  key: fs.readFileSync(__dirname + '/bin/private.key'),
  cert: fs.readFileSync(__dirname + '/bin/certificate.pem')
};

/**
 * Create HTTPS server + REST api
 */
var server = https.createServer(options, (req, res) => {
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

      case '/api/chat/upload':
        switch (req.method) {
          case 'OPTIONS':
            utils.sendJsonResponse(res, 204, '');
            break;
          case 'POST':
            var form = new formidable.IncomingForm();
            //form.uploadDir = __dirname + '/upload/';
            form.uploadDir = 'upload/';
            var newPath = null;

            form
              .on('file', (field, file) => {
                newPath = file.path
                  + file.name.substr(file.name.lastIndexOf('.'));
                fs.renameSync(file.path, newPath);
              })
              .on('end', () => {
                utils.sendJsonResponse(res, 200, { success: true, url: newPath });
              })
            form.parse(req);
            break;
          default:
            utils.sendJsonResponse(res, 501, { err: 'Not implemented' });
        }
        break;
      default:
        fs.readFile(__dirname + req.url, function (err, data) {
          if (err)
            return utils.sendJsonResponse(res, 404, 'Resource not found');
          res.writeHead(200);
          res.end(data);
        });
    }
  })
})

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
  console.log('a user has connected', socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on('event://send-message', msg => {
    chatCtrl.insert(msg)
      .then(
        (newMsg) => {
          io.emit('event://get-message', newMsg);
        }
      )
  });
});

/**
 * Make server listen
 */
server.listen({ host: config.hostname, port: secPort }, () => {
  console.log(`Server running on https://${config.hostname}:${secPort}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = server;