const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

gulp.task('eslint', () => {
  return gulp
    .src(['./index.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['eslint'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/**/*.js', ['eslint', browserSync.reload]);
  gulp.watch('./index.html', browserSync.reload);
});

gulp.task('test', ['eslint'], () => {
  browserSync.init({
    server: '',
    startPath: '/test/SpecRunner.html'
  });

  gulp.watch('./test/**/*.js', ['eslint', browserSync.reload]);
  gulp.watch('./test/SpecRunner.html', browserSync.reload);
});
