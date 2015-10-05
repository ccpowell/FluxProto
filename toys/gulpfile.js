/**
 * Created by chris_000 on 9/12/2015.
 */
var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');

gulp.task('clean-toys', function (cb) {
    return del(['dist'], cb);
});

gulp.task("toys", ['clean-toys'], function () {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx'], {base: 'src'})
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ['toys']);
