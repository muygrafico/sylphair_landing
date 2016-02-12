'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
// nunjucksRender = require('gulp-nunjucks-render'),
livereload = require('gulp-livereload');

// gulp.task('default', function() { });

gulp.task('sass', function () {
  gulp.src('site/styles/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('site/styles/css'))
  .pipe(livereload());
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
  // gulp.watch('site/pages/**/*.+(html|nunjucks)', ['nunjucks']);
  // gulp.watch('site/**/*.*', ['nunjucks']);
});
