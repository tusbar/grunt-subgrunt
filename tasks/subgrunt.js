'use strict';

var async = require('async');
var glob = require('glob');

module.exports = function (grunt) {
    var runNpmInstall = function (path, options, next) {
        grunt.util.spawn({
            cmd: options.npmPath,
            args: ['install'],
            opts: { cwd: path, stdio: 'inherit' }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.fail.warn('Failed installing node modules in "' + path + '".');
            }
            else {
                grunt.log.ok('Installed node modules in "' + path + '".');
            }

            next();
        });
    };

    var runNpmClean = function (path, options, next) {
        // Requires npm >= 1.3.10!

        grunt.util.spawn({
            cmd: options.npmPath,
            args: ['prune', '--production'],
            opts: { cwd: path, stdio: 'inherit' }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.fail.warn('Failed cleaning development dependencies in "' + path + '".');
            }
            else {
                grunt.log.ok('Cleaned development dependencies in "' + path + '".');
            }

            next();
        });
    };

    var runGruntTasks = function (path, tasks, options, next) {
        var args = options.passGruntFlags ? tasks.concat(grunt.option.flags()) : tasks;

        // removes --gruntfile arg # fixes issue #13
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg.indexOf('--gruntfile') > -1) {
                args = args.slice(0, i).concat(args.slice(i + 1));
                break;
            }
        }

        grunt.util.spawn({
            grunt: true,
            args: args,
            opts: { cwd: path, stdio: 'inherit' }
        }, function (err, result, code) {
            if (err || code > 0) {
                grunt.fail.warn('Failed running "grunt ' + args.join(' ') + '" in "' + path + '".');
            }
            else {
                grunt.log.ok('Ran "grunt ' + args.join(' ') + '" in "' + path + '".');
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
            var tasks = projects[path];
            if (!(tasks instanceof Array)) {
                tasks = [tasks];
            }

            glob('Gruntfile.{js,coffee}', {
                nocase: true,
                cwd: path
            }, function (err, files) {
                if (err || !files.length) {
                    grunt.fail.warn('The "' + path + '" directory is not valid, or does not contain a Gruntfile.');
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
            });
        }, cb);
    });
};
