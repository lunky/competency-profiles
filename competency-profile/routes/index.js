var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var isAuthenticated = require('../config/auth');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('index');
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login',
  passport.authenticate('obslocal', {
		successRedirect: '/',
		failureRedirect: '/loginFailure'
	})
);

/* Handle Logout */
router.get('/logoff', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
