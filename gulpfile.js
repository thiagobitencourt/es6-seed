'use strict';
var gulp = require('gulp');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var browserify = require('browserify');

var size = require('gulp-size');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var bump = require('gulp-bump');

var argv = require('yargs').argv;
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
  browserify({ entries: config.src.entry, debug: true })
    .transform(babelify)
    .bundle().on('error', (err) => { console.log(err) })
    .pipe(source(config.src.dest))
    .pipe(buffer())
    .pipe(replace(config.replace, json.version)) // Replace @@VERSION@@
    .pipe(gulpif(!development, uglify()))
    .pipe(size())
    .pipe(gulp.dest(config.folder.dest.app));
}

gulp.task('copyhtml', () => {
  return gulp.src([config.src.base + '**/*.html'])
    .pipe(replace(config.replace, json.version))
    .pipe(gulp.dest('./dist/'));
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

/* 
  Increment the version on package.json
  Release types:
    major 1.0.0
    minor 0.1.0
    patch 0.0.1
*/
gulp.task('bump', function(){
  var release = argv.release;
  
  return gulp
    .src(['./package.json'])
    .pipe(bump({type: release}))
    .pipe(gulp.dest('./'));
});

/** Clear any old file from dits directory */
gulp.task('clean', () => {
  gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('common', ['copyhtml']);
/** DO NOT use this directly */
gulp.task('dev-ahead', ['transpile:dev', 'common']);
gulp.task('dist-ahead', ['transpile:dist', 'common']);

/** Default and most used tasks */
gulp.task('dev', ['clean'], () => { setTimeout(() => { gulp.start('dev-ahead') }, 100) }); // Clean task has a delay, so we need this timeout.
gulp.task('dist', ['clean'], () => { setTimeout(() => { gulp.start('dist-ahead') }, 100) });

gulp.task('default', ['dist']);