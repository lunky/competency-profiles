var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var isAuthenticated = require('../config/auth');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('index');
});

/* GET home page. */
router.get('/profileReport', isAuthenticated, function (req, res) {
	res.render('profileReport');
});

router.get('/login', function (req, res) {
	res.render('login',  {messages: req.flash('error')});
});

router.post('/login',
  passport.authenticate('obslocal', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: 'Invalid username or password.'
	})
);

/* Handle Logout */
router.get('/logoff', function(req, res) {
    res.locals = {};
    req.logout();
  res.redirect('/login');
});

module.exports = router;
