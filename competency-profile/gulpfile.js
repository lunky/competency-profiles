var args = require('yargs').argv;
var config = require('./gulp.config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;
var less = require('gulp-less');
var karma = require('gulp-karma');
var mocha = require('gulp-mocha');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

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
        .pipe(gulp.dest(config.css))
        .pipe(livereload());
});

gulp.task('start', function () {
    log('Starting comptency-profiles...');
    start(true);
});

gulp.task('test', ['karma', 'mocha']);

gulp.task('karma', function () {
    return gulp
        .src(config.karma.files)
        .pipe( karma({
            configFile: __dirname + '/karma.conf.js',
            action: 'run'
        })).on('error', function (err) {
        throw err;
    });
});

gulp.task('watch', function () {
    livereload.listen();
    log(config.lessfiles);
    gulp.watch(config.lessfiles, ['build-less']);
    gulp.watch(config.karma.files, function () {
        log('watching...');
        return gulp
            .src(config.karma.files)
            .pipe(karma({
                configFile: __dirname + '/karma.conf.js',
                action: 'run'
            })).on('error', function (err) {
                throw err;
            });
    });
});

gulp.task('mocha', function () {

    return gulp.src('test/server/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}))
		.on('error', function (err) {
			process.emit('exit');
		});
});

function start(debug) {    
    var nodeOptions = getNodeOptions(debug);

    if (debug) {
        var debugMode = "--debug";
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }
    nodeOptions.ignore = ['public/**']; // lets not reload the web app everytime we make a change to the client side files

    return $.nodemon(nodeOptions)
        .on('restart', ['vet', 'watch'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
        })
        .on('start', ['build-less', 'test', 'watch'], function () {
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
