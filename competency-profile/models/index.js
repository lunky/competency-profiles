var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

// initialize database connection
var sequelize = new Sequelize('db', 'user', 'pw', {
	host: 'server',
	dialect: 'mssql',
	timestamps: false,
	//defaults
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	dialectOptions: {
		encrypt: true
	}
});

var db = {};

console.log('Starting fs setup');
fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf(".") !== 0) && (file !== 'index.js');
	})
	.forEach(function (file) {
		console.log('adding model for file: ' + file);
		var model = sequelize['import'](path.join(__dirname, file));
		console.log('adding model ' + model.name + ' to db[]');
		db[model.name] = model;
	});


//Object.keys(db).forEach(function (modelName) {
//	if ('associate' in db[modelName]) {
//		db[modelName].associate(db);
//	}
//});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
