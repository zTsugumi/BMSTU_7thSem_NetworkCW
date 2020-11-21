const cors = require('cors');

const whitelist = ['http://localhost:3001', 'https://localhost:3443', 'http://192.168.56.1:3001'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    // If the incoming request is in whitelist
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);