var url = require('url');
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	if (req.xhr) {
		res.send(401);
	} else {
		req.session.redirectUrl = req.originalUrl;
		var newurl = '/login?returnUrl=' + escape(req.originalUrl);
		res.redirect(newurl);
	}
}
module.exports = isAuthenticated;
