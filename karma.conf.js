// Karma configuration
// Generated on Fri Sep 30 2016 10:16:24 GMT-0300 (Hora oficial do Brasil)

const path = require('path');
const webpackConfig = require('./webpack.config.js');

// Add code coverage loader to webpack config
webpackConfig.module.rules.push({
  test: /\.js$/,
  include: path.resolve('src/app/'),
  exclude: [ /\.spec\.js$/],
  loader: 'istanbul-instrumenter-loader',
  query: { esModules: true }
});

const node = '../node_modules/'; 

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src/',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      node + 'angular/angular.js',
      node + 'angular-mocks/angular-mocks.js',
      'app/**/*.spec.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig, // Use the webpack configuration
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'errors-only'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
        reports: [ 'text-summary', 'html' ],
        fixWebpackSourcePaths: true
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
