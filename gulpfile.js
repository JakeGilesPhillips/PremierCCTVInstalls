var fs = require('fs');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var jsObf = require('gulp-javascript-obfuscator');
var imagemin = require('gulp-imagemin');

gulp.task('build-folder', async () =>
{
    if (!fs.existsSync("./build")) { return fs.mkdirSync("./build"); }
    else return null;
});

gulp.task('clean', () =>
{   
    return gulp.src("./build")
        .pipe(clean({ force: true }));
});

gulp.task('compile-pug', () =>
{
    return gulp.src('./development/views/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./build'));
});

gulp.task('compile-sass', () =>
{
    gulp.src('./development/static/styles/**/*.css')
        .pipe(gulp.dest('./build/static/styles'));

    return gulp.src('./development/static/styles/**/*.sass')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/static/styles'));
});


gulp.task('obfuscate-js', () =>
{
    return gulp.src('./development/static/scripts/**/*.js')
        .pipe(jsObf())
        .pipe(gulp.dest('./build/static/scripts'));
});

gulp.task('copy-js', () =>
{
    return gulp.src('./development/static/scripts/**/*.js')
    .pipe(gulp.dest('./build/static/scripts'));
});

gulp.task('minify-images', () =>
{
    return gulp.src('./development/static/images/**/*')
        .pipe(imagemin({ quality: 75 }))
        .pipe(gulp.dest('./build/static/images'));
});
gulp.task('copy-images', () =>
{
    return gulp.src('./development/static/images/**/*')
        .pipe(gulp.dest('./build/static/images'));
});

gulp.task('default',    gulp.series('build-folder', 'clean', ['compile-pug', 'compile-sass', 'copy-js', 'copy-images']));
gulp.task('dev-build',  gulp.series('build-folder', 'clean', ['compile-pug', 'compile-sass', 'copy-js', 'minify-images']));
gulp.task('prod-build', gulp.series('build-folder', 'clean', ['compile-pug', 'compile-sass', 'obfuscate-js', 'minify-images']));