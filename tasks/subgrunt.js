'use strict';
var lpad = require('lpad');

module.exports = function (grunt) {

    var runNpmInstall = function (path, options, next) {
        grunt.log.ok('Installing npm modules in "' + path + '".');

        grunt.util.spawn({
            cmd: options.npmPath,
            args: [ 'install' ],
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.warn(result.stderr || result.stdout);
            }

            if (result.stdout) {
                lpad.stdout('   | ');
                grunt.log.write(result.stdout);
                lpad.stdout();
                grunt.log.write('\n');
            }

            next();
        });
    };

    var runGruntTasks = function (path, tasks, options, next) {
        grunt.log.ok('Running "grunt ' + tasks.join(' ') + '" in "' + path + '".');

        grunt.util.spawn({
            grunt: true,
            args: tasks,
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.warn(result.stderr || result.stdout);
            }

            if (result.stdout) {
                lpad.stdout('   | ');
                grunt.log.write(result.stdout);
                lpad.stdout();
            }

            next();
        });
    };

    grunt.registerMultiTask('subgrunt', 'Run sub-projects\' grunt tasks.', function () {
        var cb = this.async();
        var options = this.options({
            npmInstall: true,
            npmPath: 'npm'
        });

        var subgrunts = this.data.modules || this.data;

        if (subgrunts instanceof Array) {
            var res = {};
            subgrunts.forEach(function (el) {
                res[el] = 'default';
            });
            subgrunts = res;
        }

        grunt.util.async.forEach(Object.keys(subgrunts), function (path, next) {
            var tasks = subgrunts[path];
            if (!(tasks instanceof Array)) {
                tasks = [tasks];
            }

            if (!grunt.file.isDir(path) || !grunt.file.exists(path, 'Gruntfile.js')) {
                grunt.fail.warn('The "' + path + '" directory is not a valid, or does not contain a Gruntfile.');
                return next();
            }

            if (options.npmInstall) {
                runNpmInstall(path, options, function () {
                    runGruntTasks(path, tasks, options, next);
                });
            }
            else {
                runGruntTasks(path, tasks, options, next);
            }
        }, cb);
    });
};
