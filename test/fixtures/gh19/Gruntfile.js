'use strict';

var fs = require('fs');

module.exports = function (grunt) {
    grunt.registerTask('default', function () {
        var done = this.async();

        var aboolean = grunt.option('aboolean');
        if (aboolean === true) {
            fs.mkdir('tmp', function () {
                fs.writeFile('tmp/output.txt', grunt.option.flags(), function () {
                    done();
                });
            });
        }
    });
};
