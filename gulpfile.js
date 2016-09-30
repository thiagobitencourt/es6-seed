'use strict';

const gulp = require('gulp');
const bowerFiles = require('main-bower-files');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const browserify = require('browserify');

const size = require('gulp-size');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
var replace = require('gulp-replace');

// const argv = require('yargs').argv; /* Not used yet */
const Server = require('karma').Server;

var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));

const config = {
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
  }
}

function transpile(development) {
  if(development) {
    browserify({ entries: config.src.entry, debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(config.src.dest))
      .pipe(buffer())
      .pipe(replace('@@VERSION@@', json.version))
      // .pipe(gulpif(development, uglify())) //gulp-if not working
      .pipe(size())
      .pipe(gulp.dest(config.folder.dest.app));
  } else {
    browserify({ entries: config.src.entry, debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(config.src.dest))
      .pipe(buffer())
      .pipe(replace('@@VERSION@@', json.version))
      .pipe(uglify())
      .pipe(size())
      .pipe(gulp.dest(config.folder.dest.app));
  }
}

gulp.task('copyhtml', () => {
  return gulp.src([config.src.base + '**/*.html']).pipe(gulp.dest('./dist/'));
});

/**
 * Copy the bower files to the dist directory
 * It evaluates the bower.json config filte to get the dependencies to be copied.
 */
gulp.task('copybower', () => {
  return gulp.src( bowerFiles(), {base: config.libs.src} ).pipe( gulp.dest(config.libs.dest) );
});


/**
 * Inject the version number into the files
 */


gulp.task('versioningHtml', () => {
  return gulp.src([config.src.base + '**/*.html'])
    .pipe(replace('@@VERSION@@', json.version))
    .pipe(gulp.dest(config.folder.dest.base));
});

gulp.task('transpile:dist', () => { transpile() });
gulp.task('transpile:dev', () => { transpile(true) });

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done() ).start();
});

gulp.task('common', ['copyhtml', 'copybower', 'versioningHtml']);

/** Default and most used tasks */
gulp.task('dev', ['transpile:dev', 'common']);
gulp.task('default', ['transpile:dist', 'common']);