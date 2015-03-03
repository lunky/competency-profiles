var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//DB
mongoose.connect('localhost', 'competencyprofiles');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
});

//MODELS
require('./models/UserData');
require('./models/Objectives');
require('./models/CompetencyLevels');

//TEMPLATES
var routes = require('./routes/index');
var members = require('./routes/members');
var competencyProfile = require('./routes/competencyProfile');
var objectiveAdmin = require('./routes/objectiveAdmin');
var profileReport = require('./routes/profileReport');
var competencyLevels = require('./routes/competencyLevels');
var rankings = require('./routes/rankings');

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
app.use(bodyParser.urlencoded({
	extended: false
}));
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

var monk = require('monk');
var configDB = require('./config/database.js');
var monkdb = monk(configDB.url);

// Configure Passport to handle authentication
require('./config/passport')(passport);

// Make some things accessible to our router
app.use(function (req, res, next) {
	req.db = monkdb;
	res.locals = {
		isAuthenticated: req.isAuthenticated(),
		title: 'Competency Profile',
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
app.use('/objectiveAdmin', objectiveAdmin);
app.use('/profileReport', profileReport);
app.use('/members', members);
app.use('/competencyLevels', competencyLevels);
app.use('/rankings', rankings);

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