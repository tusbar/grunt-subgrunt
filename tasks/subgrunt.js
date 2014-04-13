'use strict';
var _ = require('lodash'),
    lpad = require('lpad'),
    async = require('async');
require('colors');

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

    var runNpmClean = function (path, options, next) {
        // Requires npm >= 1.3.10!

        grunt.util.spawn({
            cmd: options.npmPath,
            args: [ 'prune', '--production' ],
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.log.error('Failed cleaning development dependencies in "' + path + '".');
                grunt.warn('\n' + lpad(result.stderr || result.stdout, '   ! '.yellow) + '\n>>'.yellow);
            }
            else {
                grunt.log.ok('Cleaned development dependencies in "' + path + '".');
                if (result.stdout) {
                    grunt.log.writeln(lpad(result.stdout, '   | '));
                }
            }

            next();
        });
    };

    var runGruntTasks = function (path, tasks, options, next) {
        var args = options.passGruntFlags ? grunt.option.flags().concat(tasks) : tasks;

        grunt.util.spawn({
            grunt: true,
            args: args,
            opts: { cwd: path }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.log.error('Failed running "grunt ' + args.join(' ') + '" in "' + path + '".');
                grunt.warn('\n' + lpad(result.stderr || result.stdout, '   ! '.yellow) + '\n>>'.yellow);
            }
            else {
                grunt.log.ok('Ran "grunt ' + args.join(' ') + '" in "' + path + '".');
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
            npmClean: false,
            npmPath: 'npm',
            passGruntFlags: true,
            limit: Math.max(require('os').cpus().length, 2)
        });

        var projects = this.data.projects || this.data;

        if (projects instanceof Array) {
            var res = {};
            projects.forEach(function (el) {
                res[el] = 'default';
            });
            projects = res;
        }

        async.eachLimit(Object.keys(projects), options.limit, function (path, next) {
            var tasks = projects[path],
                exists = false;
            if (!(tasks instanceof Array)) {
                tasks = [tasks];
            }

            exists = _.reduce([
                'Gruntfile.js',
                'gruntfile.js',
                'Gruntfile.coffee',
                'gruntfile.coffee'
            ], function (result, name) {
                return result || grunt.file.exists(path, name)
            }, false)

            if (!exists) {
                grunt.fail.warn('The "' + path + '" directory is not a valid, or does not contain a Gruntfile.');
                return next();
            }

            if (options.npmInstall) {
                runNpmInstall(path, options, function () {
                    runGruntTasks(path, tasks, options, options.npmClean ? function () {
                        runNpmClean(path, options, next);
                    } : next);
                });
            }
            else {
                runGruntTasks(path, tasks, options, next);
            }
        }, cb);
    });
};
