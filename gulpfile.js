'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
// nunjucksRender = require('gulp-nunjucks-render'),
livereload = require('gulp-livereload'),
connect = require('gulp-connect'),
htmlLint = require('gulp-html-lint'),
serve = require('gulp-serve');

// gulp.task('default', function() { });

gulp.task('serve', serve('site'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  hostname: 'localhost',
  middleware: function(req, res) {
    // custom optional middleware
  }
}));

gulp.task('sass', function () {
  gulp.src('site/styles/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('site/styles/css'))
  .pipe(livereload())
  .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});



gulp.task('html', function() {
  gulp.src('site/*.html')
  // .pipe(htmlLint())
  // .pipe(htmlLint.format())
  // .pipe(htmlLint.failOnError())
  .pipe(livereload())
  .pipe(connect.reload());
});

// gulp.task('nunjucks', function() {
//   nunjucksRender.nunjucks.configure(['site/templates/']);

//   // Gets .html and .nunjucks files in pages
//   return gulp.src('site/pages/**/*.+(html|nunjucks)')
//   // Renders template with nunjucks
//   .pipe(nunjucksRender())
//   // output files in site folder
//   .pipe(gulp.dest('site'))
//   .pipe(livereload());
// });

gulp.task('watch', function() {

  livereload({ start: true });
  livereload.listen();
  // gulp.watch('less/*.less', ['less']);
  gulp.watch('site/sass/**/*.scss', ['sass']);
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch('site/*.html', ['html']);
  // gulp.watch('site/pages/**/*.+(html|nunjucks)', ['nunjucks']);
  // gulp.watch('site/**/*.*', ['nunjucks']);
});

gulp.task('default', ['serve','watch', 'connect']);

livereload({ start: true })
