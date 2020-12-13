const config = require('../config/key');

function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}

function sendJsonResponse(res, status, content, cookies = null) {
  try {
    var strContent = JSON.stringify(content);

    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', byteLength(strContent));

    if (cookies) {
      const cookiesOpts = {
        expires: new Date(Date.now() + config.cookiesExpiration * 24 * 60 * 60 * 1000),
        secure: false,    // set to true if using https
        httpOnly: true,
        path: '/'
      };
      cookies.map(cookie => cookiesSetter(res, cookie, cookiesOpts))
    }

    res.end(strContent);
  } catch (err) {
    console.log(err);
  }
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
        if (opts.path) {
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
  cookiesParser,
}