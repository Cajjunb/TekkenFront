// Karma configuration
// Generated on Mon Nov 28 2016 16:31:49 GMT-0200 (BRST)

module.exports = function (config) {
    config.set({
        hostname : 'localhost',

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            { pattern: 'node_modules/angular/angular.js', watched: false},
            { pattern: 'node_modules/angular-route/angular-route.js', watched: false},
            { pattern: 'node_modules/angular-mocks/angular-mocks.js', watched: false},
            { pattern: 'node_modules/jquery/dist/jquery.js', watched: false},
            { pattern: 'src/**/*.js'}, 
            'spec/**/*.js',
        ],

        // list of files to exclude
        exclude: [
            'src/app/spas/directive/highcharts.js',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage/javascript',
            reporters: [{
              type: 'lcov',
              subdir: 'lcov'
            },
            { type: 'text-summary' }]
          }, 


        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        //browsers: ['PhantomJS'],

        // browsers: ['phanthomjs_without_security'],

        // customLaunchers: {
        //     phanthomjs_without_security: {
        //         base: 'PhantomJS',
        //         flags: ['--ignore-ssl-errors=true', '--web-security=false']
        //     }
        // },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity
    });
};
