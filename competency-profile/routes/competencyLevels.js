/* JUST for rendering the site */

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

/* GET competencyLevels listing. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('competencyLevels');
});

module.exports = router;
