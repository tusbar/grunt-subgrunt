'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            }
        }
    });

    grunt.registerTask('test', [
        'jshint'
    ]);

    // Alias default task to test
    grunt.registerTask('default', [
        'test'
    ]);
};
