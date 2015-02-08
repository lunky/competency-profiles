var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

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

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Stylus --> CSS');
    
    return gulp
        .src(config.stylus)
        .pipe($.plumber())// exit gracefully if something fails after this
        .pipe($.stylus())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp));
});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function (done) {
    var files = [].concat(
        config.temp + '**/*.css',
        config.build + 'styles/**/*.css'
    );
    clean(files, done);
});




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

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}
