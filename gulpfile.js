const gulp = require('gulp');
const bowerFiles = require('main-bower-files');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const browserify = require('browserify');
const size = require('gulp-size');

const uglify = require('gulp-uglify');

gulp.task('copy', () => {
  return gulp.src(['./src/index.html',])
  .pipe(gulp.dest('./dist/'));
});

/**
 * Copy the bower files to the dist directory
 * It evaluates the bower.json config filte to get the dependencies to be copied.
 */
gulp.task('copybower', () => {
  return gulp.src(bowerFiles(), {base: './src/assets/libs'})
  .pipe(gulp.dest('./dist/assets/libs'));
});

gulp.task('transpile', () => {
  browserify({ entries: 'src/app/app.module.js', debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source('app.module.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(size())
  .pipe(gulp.dest('dist/app/'));
});

gulp.task('default', ['transpile', 'copy', 'copybower']);