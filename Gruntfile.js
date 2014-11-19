'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    // Load this plugin’s tasks
    grunt.loadTasks('tasks');

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            }
        },

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
            ]
        },

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
            }
        },

        nodeunit: {
            tests: [
                'test/*_test.js'
            ]
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'clean',
        'subgrunt',
        'nodeunit'
    ]);

    // Alias default task to test
    grunt.registerTask('default', [
        'test'
    ]);
};
