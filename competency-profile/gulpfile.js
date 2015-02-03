var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
