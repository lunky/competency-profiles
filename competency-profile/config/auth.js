var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
		if(req.xhr){
				res.send(401);
		}else{
		 res.redirect('/login');
		}
}
module.exports = isAuthenticated;            