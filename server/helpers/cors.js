function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function corsWithOptions(req, res) {
  const whitelist = ['http://localhost:3001'];

  var origin = req.headers.origin;

  console.log(req);
}

module.exports = {
  cors
};