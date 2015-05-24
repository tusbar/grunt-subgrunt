'use strict';

var fs = require('fs');

module.exports = function (grunt) {
    grunt.registerTask('one', function () {
        var done = this.async();

        fs.mkdir('tmp', function () {
            fs.writeFile('tmp/output.txt', 'one', function () {
                done();
            });
        });
    });

    grunt.registerTask('two', function () {
        var done = this.async();

        fs.writeFile('tmp/output.txt', 'two', function () {
            done();
        });
    });
};
