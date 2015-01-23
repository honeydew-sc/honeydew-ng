// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'traceur'],

        preprocessors: {
            '**/*_test.es6.js': ['traceur'],
            '**/*.html': ['ng-html2js']
        },

        traceurPreprocessor: {
            options: {
                'arrow-functions': true,
                modules: 'inline'
            }
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'tpl'
        },

        // list of files / patterns to load in the browser
        files: [
            // angular packages
            'app/bower_components/jquery/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-ui-codemirror/ui-codemirror.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angular-pusher/angular-pusher.js',
            'app/bower_components/ngstorage/ngStorage.js',
            'app/bower_components/codemirror/lib/codemirror.js',
            'app/bower_components/codemirror/addon/runmode/runmode.js',
            'app/bower_components/ng-grid/build/ng-grid.min.js',
            'app/bower_components/angular-markdown-directive/markdown.js',
            'app/bower_components/showdown/compressed/showdown.js',
            'app/bower_components/angular-tree-control/angular-tree-control.js',
            'app/bower_components/angular-mass-autocomplete/massautocomplete.js',
            'app/bower_components/angular-ui-select/dist/select.js',

            // our scripts

            // load components first so module dependencies are available
            'app/config.js',
            'app/components/**/*-app.js',

            'app/app.js',
            'app/editor/**/*.js',
            'app/monitor/**/*.js',
            'app/set/**/*.js',

            'app/components/**/*.js',

            // let karma see our templates for pre-processing
            'app/components/**/*.html'
        ],

        // list of files / patterns to exclude
        exclude: [ '**/*.es6.js', '**/traceur-runtime.js' ],

        // web server port
        port: 7979,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
