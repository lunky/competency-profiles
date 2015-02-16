var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

/* GET users listing. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('members');
});

module.exports = router;
