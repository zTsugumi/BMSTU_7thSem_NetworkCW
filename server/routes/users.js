var express = require('express');
const bodyParser = require('body-parser');
const cors = require('../helpers/cors');

var router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })

module.exports = router
