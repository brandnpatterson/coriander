const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/js/**/*.js', browserSync.reload);
  gulp.watch('./index.html', browserSync.reload);
});
