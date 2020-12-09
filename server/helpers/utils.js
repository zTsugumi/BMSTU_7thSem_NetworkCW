const config = require('../config/key');

function sendJsonResponse(res, status, content, cookies = null) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', JSON.stringify(content).length);

  const cookiesOpts = {
    expires: new Date(Date.now() + config.cookiesExpiration),
    secure: false,    // set to true if using https
    httpOnly: true,
    path: '/'
  }
  if (cookies)
    cookies.map(cookie => cookiesSetter(res, cookie, cookiesOpts))

  res.end(JSON.stringify(content));
}

function bodyParser(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString()
      });

      req.on('end', () => {
        resolve(JSON.parse(body || '{}'));
      })
    }
    catch (err) {
      reject(err);
    }
  });
}

function cookiesSetter(res, content, opts) {
  return new Promise((resolve, reject) => {
    try {
      if (opts) {
        if (opts.expires) {
          content += `; Expires=${opts.expires.toUTCString()}`;
        }
        if (opts.secure) {
          content += '; Secure';
        }
        if (opts.httpOnly) {
          content += '; HttpOnly';
        }
        if (opts.path){
          content += `; Path=${opts.path}`;
        }
      }

      res.setHeader('Set-Cookie', content);

      resolve(res);
    }
    catch (err) {
      reject(err);
    }
  })
}

function cookiesParser(req) {
  return new Promise((resolve, reject) => {
    try {
      var list = {};
      var rc = req.headers.cookie;

      rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });

      resolve(list);
    }
    catch (err) {
      reject(err);
    }
  });

}

module.exports = {
  sendJsonResponse,
  bodyParser,
  cookiesParser
}