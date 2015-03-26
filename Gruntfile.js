'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    // Load this plugin’s tasks
    grunt.loadTasks('tasks');

    grunt.initConfig({
        jscs: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/**/*.js',
                        'test/*.js',
                        'test/fixtures/*/*.js'
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/**/*.js',
                        'test/*.js',
                        'test/fixtures/*/*.js'
                    ]
                }
            }
        },

        // ## //

        clean: {
            simple: [
                'test/fixtures/simple/tmp'
            ],
            array: [
                'test/fixtures/array/tmp'
            ],
            multiple: [
                'test/fixtures/multiple/tmp'
            ],
            multipleTasks: [
                'test/fixtures/multipleTasks/tmp'
            ],
            customOptions: [
                'test/fixtures/customOptions/tmp'
            ],
            noProjectsObject: [
                'test/fixtures/noProjectsObject/tmp'
            ],
            npmInstall: [
                'test/fixtures/npmInstall/node_modules',
                'test/fixtures/npmInstall/tmp'
            ],
            npmClean: [
                'test/fixtures/npmClean/node_modules',
                'test/fixtures/npmClean/tmp'
            ],
            customCase: [
                'test/fixtures/customCase/tmp'
            ],
            coffee: [
                'test/fixtures/coffee/tmp'
            ]
        },

        // ## //

        subgrunt: {
            simple: {
                projects: {
                    'test/fixtures/simple': 'build'
                }
            },
            array: {
                projects: [
                    'test/fixtures/array'
                ]
            },
            multiple: {
                projects: [
                    'test/fixtures/multiple/multiple-1',
                    'test/fixtures/multiple/multiple-2'
                ]
            },
            multipleTasks: {
                projects: {
                    'test/fixtures/multipleTasks': ['one', 'two']
                }
            },
            customOptions: {
                projects: {
                    'test/fixtures/customOptions': ['default', '--text=foo']
                }
            },
            noProjectsObject: {
                'test/fixtures/noProjectsObject': 'default'
            },
            npmInstall: {
                options: {
                    npmInstall: true
                },
                projects: [
                    'test/fixtures/npmInstall'
                ]
            },
            npmClean: {
                options: {
                    npmInstall: true,
                    npmClean: true
                },
                projects: [
                    'test/fixtures/npmClean'
                ]
            },
            customCase: {
                projects: [
                    'test/fixtures/customCase'
                ]
            },
            coffee: {
                projects: [
                    'test/fixtures/coffee'
                ]
            }
        },

        // ## //

        nodeunit: {
            tests: [
                'test/*_test.js'
            ]
        }
    });

    grunt.registerTask('test', [
        'jscs:all',
        'jshint:all',
        'clean',
        'subgrunt',
        'nodeunit'
    ]);

    // Alias default task to test
    grunt.registerTask('default', [
        'test'
    ]);
};
