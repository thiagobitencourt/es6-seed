'use strict';
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var browserify = require('browserify');

var size = require('gulp-size');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var clean = require('gulp-clean');

// var argv = require('yargs').argv; /* Not used yet */
var Server = require('karma').Server;

var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));

var config = {
  src: {
    base: './src/',
    entry: 'src/app/app.module.js',
    dest: 'app.module.js'
  },
  folder: {
    dest: {
      base: 'dist/',
      app:'dist/app/' 
    }
  },
  libs: {
    src: './src/assets/libs',
    dest: './dist/assets/libs'
  },
  replace: '@@VERSION@@'
}

/**
 * Transpile code 6to5
 */
gulp.task('transpile:dist', () => { transpile() });
gulp.task('transpile:dev', () => { transpile(true) });

function transpile(development) {
  if(development) {
    browserify({ entries: config.src.entry, debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(config.src.dest))
      .pipe(buffer())
      .pipe(replace(config.replace, json.version)) // Replace @@VERSION@@
      // .pipe(gulpif(development, uglify())) //gulp-if not working
      .pipe(size())
      .pipe(gulp.dest(config.folder.dest.app));
  } else {
    browserify({ entries: config.src.entry, debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(config.src.dest))
      .pipe(buffer())
      .pipe(replace(config.replace, json.version))
      .pipe(uglify())
      .pipe(size())
      .pipe(gulp.dest(config.folder.dest.app));
  }
}

gulp.task('copyhtml', () => {
  return gulp.src([config.src.base + '**/*.html'])
    .pipe(replace(config.replace, json.version))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Copy the bower files to the dist directory
 * It evaluates the bower.json config filte to get the dependencies to be copied.
 */
gulp.task('copybower', () => {
  return gulp.src( bowerFiles(), {base: config.libs.src} ).pipe( gulp.dest(config.libs.dest) );
});

/**
 * Run test once and exit
 */
gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done() ).start();
});

/** Clear any old file from dits directory */
gulp.task('clean', () => {
  gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('common', ['copyhtml', 'copybower']);
/** DO NOT use this directly */
gulp.task('dev-ahead', ['transpile:dev', 'common']);
gulp.task('dist-ahead', ['transpile:dist', 'common']);

/** Default and most used tasks */
gulp.task('dev', ['clean'], () => { setTimeout(() => { gulp.start('dev-ahead') }, 100) });
gulp.task('dist', ['clean'], () => { setTimeout(() => { gulp.start('dist-ahead') }, 100) });

gulp.task('default', ['dist']);