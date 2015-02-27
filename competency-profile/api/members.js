var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

router.get('/', isAuthenticated, function(req, res) {
		res.send({ 'data': [
							{
								'userId': 'qwilson'
							},
							{
								'userId': 'dkroeker'
							},
							{
								'userId': 'alevine'
							},
							{
								'userId': 'phteven'
							}
						] });
});

module.exports = router;
