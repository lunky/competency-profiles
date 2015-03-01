var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var passport = require('passport');
var flash = require('connect-flash');

//TEMPLATES
var routes = require('./routes/index');
var members = require('./routes/members');
var competencyProfile = require('./routes/competencyProfile');
var objectives = require('./routes/objectives');
var competencyLevels = require('./routes/competencyLevels');

//REST
var competencyProfileApi = require('./api/competencyProfile');
var objectivesApi = require('./api/objectives');
var competencyLevelsApi = require('./api/competencyLevels');
var membersApi = require('./api/members');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(flash());
// required for passport
app.use(session({
	secret: 'secretkey-tacocat-yekterces',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(configDB.url);

require('./config/passport')(passport, db);

// Make some things accessible to our router
app.use(function (req, res, next) {
	req.db = db;
	res.locals = {
		isAuthenticated : req.isAuthenticated(),
        title : 'Competency Profile',
		userDisplayName: 'Aaron Levine',
		userScore: 'Senior Consultant' //TODO replace with real score
	};
	if (req.user) {
		res.locals.userDisplayName = req.user.displayName;
		res.locals.directReports = req.user.directReports;
        res.locals.isAdmin = true;
	}
	next();
});

//TEMPLATE Rendering
app.use('/', routes);
app.use('/competencyProfile', competencyProfile);
app.use('/objectives', objectives);
app.use('/members', members);
app.use('/competencyLevels', competencyLevels);

//REST Calls
app.use('/api/competencyProfile', competencyProfileApi);
app.use('/api/objectives', objectivesApi);
app.use('/api/competencyLevels', competencyLevelsApi);
app.use('/api/members', membersApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
	app.locals.pretty = true;
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		title: 'Competency Profile',
		message: err.message,
		error: {}
	});
});

module.exports = app;
