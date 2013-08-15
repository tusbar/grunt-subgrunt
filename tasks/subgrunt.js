'use strict';
var lpad = require('lpad');
var colors = require('colors');

module.exports = function (grunt) {

    var runNpmInstall = function (path, options, next) {
        grunt.util.spawn({
            cmd: options.npmPath,
            args: [ 'install' ],
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.log.error('Failed installing node modules in "' + path + '".');
                grunt.warn('\n' + lpad(result.stderr || result.stdout, '   ! '.yellow) + '\n>>'.yellow);
            }
            else {
                grunt.log.ok('Installed node modules in "' + path + '".');
                if (result.stdout) {
                    grunt.log.writeln(lpad(result.stdout, '   | '));
                }
            }

            next();
        });
    };

    var runGruntTasks = function (path, tasks, options, next) {
        grunt.util.spawn({
            grunt: true,
            args: tasks,
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.log.error('Failed running "grunt ' + tasks.join(' ') + '" in "' + path + '".');
                grunt.warn('\n' + lpad(result.stderr || result.stdout, '   ! '.yellow) + '\n>>'.yellow);
            }
            else {
                grunt.log.ok('Ran "grunt ' + tasks.join(' ') + '" in "' + path + '".');
                if (result.stdout) {
                    grunt.log.writeln(lpad(result.stdout, '   | '));
                }
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

        var projects = this.data.projects || this.data;

        if (projects instanceof Array) {
            var res = {};
            projects.forEach(function (el) {
                res[el] = 'default';
            });
            projects = res;
        }

        grunt.util.async.forEach(Object.keys(projects), function (path, next) {
            var tasks = projects[path];
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
