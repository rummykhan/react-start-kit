
var gulp = require('gulp');

var browserify = require('browserify');

var babelify = require('babelify');

var source = require('vinyl-source-stream');

var browserSync = require('browser-sync').create();

gulp.task('browserify', function () {

    return browserify('./js/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('js-watch', ['browserify'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js-watch'], function() {

    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });

    gulp.watch('js/*.js', ['js-watch']);
});