function sendJsonResponse(res, status, content, cookie = null) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', JSON.stringify(content).length);
  if (cookie)
    res.setHeader('Set-Cookie', cookie);

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