var gulp = require('gulp');
var streamqueue = require('streamqueue');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var bowerFiles = require('main-bower-files');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');

gulp.task('app', function () {
  streamqueue(
    {objectMode: true},
    gulp.src('app/main.js'),
    //gulp.src('app/tmpl/**/*.html').pipe(templateCache({module: 'app'})),
    gulp.src(['app/*.js', '!app/test.js']),
    gulp.src(['app/**/*.js', '!app/*.js']),
    gulp.src('app/test.js')
  ).pipe(concat('app.js'))
   .pipe(gulp.dest('public/js'));

  gulp.src('app/styl/app.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('public/css'));

  gulp.src('app/tmpl/*')
    .pipe(gulp.dest('public/tmpl'))

  gulp.src('app/index.html').pipe(gulp.dest('public'));
});

gulp.task('vendor', function () {
  gulp.src('vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'));

  gulp.src('vendor/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function () {
  rimraf('public/**/*.*', function () {});
});

gulp.task('build', function () {
  runSequence(
    'clean',
    ['vendor', 'app']
  )
});

gulp.task('serve', function () {
  gulp.src('public')
    .pipe(webserver())
});

gulp.task('watch', ['build'], function () {
  gulp.watch('app/**/*.*', ['app']);
});