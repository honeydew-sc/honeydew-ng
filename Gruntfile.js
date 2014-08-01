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
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/app.js',
                    '<%= yeoman.app %>/{components,editor,report}/**/*.js'
                ],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
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
                    '<%= yeoman.app %>/{components,editor,report}/**/*.{js,html,css}',
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
                livereload: 35729
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
                '<%= yeoman.app %>/{components,editor,report}/**/*.js',
                '!<%= yeoman.app %>/{components,editor,report}/**/*_test.js',
                'Gruntfile.js'
            ])
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

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            ci: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                reporters: 'dots'
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
                },
                values: {
                    hostnamePickerDomains: grunt.file.readJSON('domains.json')
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

                    glob('e2e/*_test.feature', {sync: true}, function (er, files) {
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


            deployFront: {
                options: {
                    stdout: true
                },
                command: 'rsync -avzh <%= yeoman.dist %>/ honeydew@termdew:/opt/honeydew-ui/htdocs/'
            },

            deployBack: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: 'git push && ssh termdew "cd /opt/honeydew-ui/ng/ && git fetch --all && git reset --hard origin/master"'
            }
        }
    });

    grunt.registerTask('e2e', [
        'shell:honeydew'
    ]);

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        else {
            grunt.task.run([
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
        'ngconstant:build',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin',
        'shell:copyDev'
    ]);

    grunt.registerTask('dist', function () {
        grunt.task.run(['build']);
    });

    grunt.registerTask('deployFront', [
        'build',
        'karma:unit',
        'shell:deployFront'
    ]);

    grunt.registerTask('deployBack', [
        'shell:phpTests',
        'shell:deployBack'
    ]);
};
