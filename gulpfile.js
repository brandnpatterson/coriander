const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const styleLint = require('gulp-stylelint');
const webpack = require('webpack-stream');

gulp.task('set-prod-env', () => {
  return (process.env.NODE_ENV = 'production');
});

gulp.task('eslint', () => {
  return gulp
    .src(['./src/js/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('stylelint', () => {
  return gulp.src('./src/sass/**/*.scss').pipe(
    styleLint({
      reporters: [{ formatter: 'string', console: true }]
    })
  );
});

gulp.task('scripts', ['eslint'], () => {
  return gulp
    .src('./src/js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('styles', ['stylelint'], () => {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      })
    )
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('styles-prod', ['stylelint'], () => {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      })
    )
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts', 'styles'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.scss', ['styles']);
  gulp.watch('./index.html', browserSync.reload);
});

gulp.task('prod', ['set-prod-env', 'scripts', 'styles-prod']);
