var args = require('yargs').argv;
var config = require('./gulp.config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;
var less = require('gulp-less');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');
    
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

// Compiles LESS > CSS 
gulp.task('build-less', function () {
    return gulp
        .src(config.less)
        .pipe(less())
        .pipe(gulp.dest(config.css));
});

gulp.task('start', function () {
    log('Starting comptency-profiles...');
    start(true);
});

var karma = require('gulp-karma');
 
var testFiles = [
	'bower_components/angular/angular.js',
	'bower_components/angular-mocks/angular-mocks.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/angular-animate/angular-animate.js',
	'public/app/**/*.js',
	'test/**/*.js'
];
 
gulp.task('test', function() {
  // Be sure to return the stream 
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'D:/git/competency-profiles/competency-profile/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});

gulp.task('watchtest', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
function start(debug) {    
    var nodeOptions = getNodeOptions(debug);

    if (debug) {
        var debugMode = "--debug";
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }
	nodeOptions.ignore = ['public/**']; // lets not reload the web app everytime we make a change to the client side files

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
        })
        .on('start', ['watchtest'], function () {
            log('*** nodemon started');
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}