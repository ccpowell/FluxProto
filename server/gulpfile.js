/**
 * Created by chris_000 on 9/12/2015.
 */
var gulp = require("gulp");
var babel = require("gulp-babel");
var stylus = require("gulp-stylus");
var del = require('del');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('jscs-client', function () {
    return gulp.src('client/app.js')
        .pipe(jscs({}));
});

gulp.task('jscs-server', function () {
    return gulp.src('server/server.js')
        .pipe(jscs({esnext: true}));
});

gulp.task('clean-client', function (cb) {
    return del(['client/dist'], cb);
});

gulp.task('clean-toys', function (cb) {
    return del(['toys/dist'], cb);
});

gulp.task('clean-server', function (cb) {
    return del(['server/dist'], cb);
});

gulp.task('clean', function () {
    return del(['client/dist', 'server/dist']);
});

gulp.task("server-js", function () {
    return gulp.src("server/src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("server/dist"));
});

gulp.task("toys", ['clean-toys'], function () {
    return gulp.src("toys/src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("toys/dist"));
});

gulp.task("client-js", function () {
    return browserify({entries: './client/src/app.jsx', extensions: ['.js','.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("client/dist"));
});

gulp.task("client-styl", function () {
    return gulp.src("client/css/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("client/dist"));
});

gulp.task("client-css", function () {
    return gulp.src("client/css/**/*.css")
        .pipe(gulp.dest("client/dist"));
});

gulp.task("client-html", function () {
    return gulp.src("client/index.html")
        .pipe(gulp.dest("client/dist"));
});

gulp.task('server', function (cb) {
    runSequence('clean-server', 'server-js', cb);
});

gulp.task("client", [], function (cb) {
    runSequence('clean-client', ['client-js', 'client-css', 'client-styl', 'client-html'], cb);
});

gulp.task("default", ['client', 'server']);
