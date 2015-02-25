var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('competencyProfile');
});


module.exports = router;