// Generated on 2014-01-17 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: 'app',
            dist: 'dist',
            folders: '{components,editor,landing,monitor,report,screenshot,set}'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            traceur:  {
                files: [ '<%= yeoman.app %>/**/*.es6' ],
                tasks: [ 'newer:traceur' ]
            },
            fileblocks: {
                files: [
                    '<%= yeoman.app %>/**/*.js',
                    '!<%= yeoman.app %>/**/*app.js',
                    '!<%= yeoman.app %>/config.js',
                    '!<%= yeoman.app %>/bower_components/**',
                    '!<%= yeoman.app %>/**/*.es6',
                    '!<%= yeoman.app %>/**/*_test*'
                ],
                tasks: [ 'newer:fileblocks' ]
            },
            css: {
                files: [ '<%= yeoman.app %>/**/*.scss' ],
                tasks: [
                    'sass_globbing',
                    'sass'
                ]
            },
            js: {
                files: [
                    '<%= yeoman.app %>/app.js',
                    '<%= yeoman.app %>/<%= yeoman.folders %>/**/*.js'
                ],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/app.css',
                    '<%= yeoman.app %>/<%= yeoman.folders %>/**/*.{js,html,css,scss}',
                    '<%= yeoman.app %>/index.html',
                    '.tmp/styles/*.css',
                    '.tmp/styles/**/*.css'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            },
            proxies: [
                {
                    context: [
                        '/rest.php',
                        '/reports.php',
                        '/docs',
                        '/editor/editor/panes'
                    ],
                    host: 'localhost',
                    port: 80,
                    https: false,
                    changeOrigin: false
                }
            ]
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: grunt.file.expand([
                '<%= yeoman.app %>/app.js',
                '<%= yeoman.app %>/<%= yeoman.folders %>/**/*.js',
                '!<%= yeoman.app %>/<%= yeoman.folders %>/**/*_test.js',
                'Gruntfile.js'
            ])
        },

        sass: {
            dist: {
                files: {
                    '<%= yeoman.app %>/app.css': '<%= yeoman.app %>/app.scss'
                }
            }
        },

        sass_globbing: {
            dist: {
                files: {
                    '<%= yeoman.app %>/_imports.scss': [
                        'app/components/colors/*.scss',
                        'app/{components,editor,landing,monitor,screenshot,set}/**/*.scss',
                        'app/<%= yeoman.folders %>/**/*.scss'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                src: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{jpg,jpeg,gif,webm,webp,svg}',
                        // '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif,webm}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'scripts/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,webm,txt}',
                        '.htaccess',
                        '*.html',
                        '**/*.html',
                        '{editor,components,landing}/**/*.{html,png,webm}',
                        'bower_components/**/*',
                        'images/{,*/}*.{webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    flatten: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/styles',
                    src: ['bower_components/select2/**/*.png']
                }, {
                    expand: true,
                    flatten: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['bower_components/angular-tree-control/**/*.png']
                }, {
                    expand: true,
                    flatten: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/fonts',
                    src: ['bower_components/font-awesome/fonts/*.*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // concat hostname component modules
        concat: {
            hostnameJs: {
                src: [
                    '<%= yeoman.app %>/config.js',
                    '<%= yeoman.app %>/bower_components/ngstorage/ngStorage.min.js',
                    '<%= yeoman.app %>/components/hostname/sc-hostname-app.js',
                    '<%= yeoman.app %>/components/hostname/*.js',
                    '!<%= yeoman.app %>/components/hostname/*_test.js'
                ],
                dest: '<%= yeoman.dist %>/scripts/sc.hostname.min.js'
                // dest: '.tmp/concat/scripts/hostname.js'
            },
            hostnameCss: {
                src: '<%= yeoman.app %>/components/hostname/*.css',
                dest: '.tmp/styles/hostname.css'
            }
        },

        uglify: {
            hostname: {
                src: '.tmp/concat/scripts/hostname.js',
                dest: '<%= yeoman.dist %>/scripts/sc.hostname.min.js'
            }
        },

        cssmin: {
            hostname: {
                src: '.tmp/styles/hostname.css',
                dest: '<%= yeoman.dist %>/styles/sc.hostname.min.css'
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
            ci: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                reporters: 'dots',
                browsers: ['PhantomJS']
            },
            travis: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        ngconstant: {
            options: {
                name: 'config',
                dest: 'app/config.js',
                constants: function () {
                    var prefix, ret = {};
                    grunt.file.read('/opt/honeydew/honeydew.ini')
                        .split(/\n/)
                        .filter(function (it) {
                            return it !== '';
                        }).forEach(function (line) {
                            if (line.indexOf('[') !== -1) {
                                prefix = line.slice(1, -1) + 'Config';
                                ret[prefix] = {};
                            }
                            else {
                                var data = line.split('=');
                                ret[prefix][data[0]] = data[1];
                            }
                        });

                    return ret;
                }
            },
            build: {}
        },

        // e2e test settings
        shell: {
            copyDev: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: 'cp -R <%= yeoman.dist %>/* /opt/honeydew-ui/htdocs/'
            },

            honeydew: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: function () {
                    var glob = require('glob');
                    var command = [
                        'perl',
                        '-w /opt/honeydew/bin/honeydew.pl',
                        '-isMine',
                        '-feature=' + process.cwd() + '/'
                    ].join(' ');
                    var commands = [];

                    glob('**/*/*_test.feature', {sync: true}, function (er, files) {
                        files.forEach( function (feature) {
                            commands.push(command + feature);
                        });

                        commands.push('wait');
                    });

                    return commands.join(' && ');
                }
            },

            phpTests: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: 'find backend/tests -name "*_tests.php" | xargs -I{} php {}'
            },

            fixPermissions: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'ssh honeydew "perl /opt/honeydew/bin/parsePhrases.pl && umask 0 && find /opt/honeydew-ui/ng/backend/rest-routes/sources/ -type f | xargs -I{} chmod 0666 {} \;"'
            },

            showPermissions: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'ssh honeydew "find /opt/honeydew-ui/ng/backend/rest-routes/sources/ -type f | xargs -I{} ls -al {} \;"'
            },

            deployBack: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: 'git push && ssh honeydew "cd /opt/honeydew-ui/ng/ && git fetch --all && git reset --hard origin/master"'
            }
        },

        traceur: {
            options: {
                sourceMaps: 'inline',
                modules: 'inline'
            },
            custom: {
                files:[{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['**/*.es6'],
                    dest: '<%= yeoman.app %>',
                    ext: '.js'
                }]
            }
        },

        fileblocks: {
            all: {
                src: '<%= yeoman.app %>/index.html',
                blocks: {
                    scripts: {
                        src: [
                            '**/*.js',
                            '!**/*app.js',
                            '!config.js',
                            '!bower_components/**',
                            '!**/*.es6',
                            '!**/*_test*'
                        ],
                        cwd: '<%= yeoman.app %>'
                    },
                    styles: {
                        src: [
                            '**/*.css',
                            '!bower_components/**',
                        ],
                        cwd: '<%= yeoman.app %>'
                    }
                },
                options: {
                    removeFiles: true
                }
            }
        },

        rsync: {
            options: {
                args: [
                    '--verbose',
                    '--archive',
                    '--human-readable',
                    '--compress'
                ],
                exclude: [
                    '.git*'
                    ,'*.scss'
                    ,'node_modules'
                ],
                recursive: true
            },
            prod: {
                options: {
                    src: '<%= yeoman.dist %>/',
                    dest: '/opt/honeydew-ui/htdocs/',
                    host: 'honeydew@honeydew'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'serve'
    ]);

    grunt.registerTask('e2e', [
        'shell:honeydew'
    ]);

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        else {
            grunt.task.run([
                'config',
                'clean:server',
                'configureProxies:server',
                'bower-install',
                'autoprefixer',
                'connect:livereload',
                'watch'
            ]);
        }
    });

    grunt.registerTask('test', [
        'build',
        'clean:server',
        'autoprefixer',
        'connect:test',
        'karma:unit',
        'shell:phpTests',
        'shell:honeydew'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'config',
        'traceur',
        'fileblocks',
        'useminPrepare',
        'autoprefixer',
        'concat:generated',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin:generated',
        'uglify:generated',
        'rev',
        'usemin',
        'htmlmin',
        'hostname'
    ]);

    grunt.registerTask('dist', function () {
        grunt.task.run(['build']);
    });

    grunt.registerTask('deploy', [
        'build',
        'karma:unit',
        'shell:phpTests',
        'rsync:prod',
        'fixPermissions',
        'shell:deployBack'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'karma:unit',
        'rsync:prod',
        'fixPermissions',
        'deployBack'
    ]);

    grunt.registerTask('deployBack', [
        'shell:phpTests',
        'shell:deployBack'
    ]);

    grunt.registerTask('fixPermissions', [
        'shell:fixPermissions',
        'shell:showPermissions'
    ]);

    grunt.registerTask('hostname', [
        'concat:hostnameJs',
        'concat:hostnameCss',
        'ngAnnotate',
        'cssmin:hostname',
        'shell:copyDev'
    ]);

    grunt.registerTask('config', [
        'ngconstant:build',
        'traceur',
        'fileblocks',
        'css'
    ]);

    grunt.registerTask('ci', [
        'config',
        'karma:ci',
    ]);

    grunt.registerTask('css', [
        'sass_globbing:dist',
        'sass:dist'
    ]);
};
