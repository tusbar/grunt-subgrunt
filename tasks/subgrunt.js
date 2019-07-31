'use strict'

const async = require('async')
const glob = require('glob')

module.exports = function (grunt) {
  const runNpmInstall = function (path, options, next) {
    grunt.util.spawn({
      cmd: options.npmPath,
      args: options.npmInstallArgs,
      opts: {cwd: path, stdio: 'inherit'}
    }, (err, result, code) => {
      if (err || code > 0) {
        grunt.fail.warn('Failed installing node modules in "' + path + '".')
      } else {
        grunt.log.ok('Installed node modules in "' + path + '".')
      }

      next()
    })
  }

  const runNpmClean = function (path, options, next) {
    // Requires npm >= 1.3.10!

    grunt.util.spawn({
      cmd: options.npmPath,
      args: options.npmCleanArgs,
      opts: {cwd: path, stdio: 'inherit'}
    }, (err, result, code) => {
      if (err || code > 0) {
        grunt.fail.warn('Failed cleaning development dependencies in "' + path + '".')
      } else {
        grunt.log.ok('Cleaned development dependencies in "' + path + '".')
      }

      next()
    })
  }

  const runGruntTasks = function (path, tasks, options, next) {
    let args = options.passGruntFlags ? tasks.concat(grunt.option.flags()) : tasks

    // Removes --gruntfile arg # fixes issue #13
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      if (arg.indexOf('--gruntfile') > -1) {
        args = args.slice(0, i).concat(args.slice(i + 1))
        break
      }
    }

    grunt.util.spawn({
      grunt: true,
      args,
      opts: {cwd: path, stdio: 'inherit'}
    }, (err, result, code) => {
      if (err || code > 0) {
        grunt.fail.warn('Failed running "grunt ' + args.join(' ') + '" in "' + path + '".')
      } else {
        grunt.log.ok('Ran "grunt ' + args.join(' ') + '" in "' + path + '".')
      }

      next()
    })
  }

  grunt.registerMultiTask('subgrunt', 'Run sub-projects\' grunt tasks.', function () {
    const cb = this.async()
    const options = this.options({
      npmInstall: true,
      npmClean: false,
      npmPath: 'npm',
      npmInstallArgs: ['install'],
      npmCleanArgs: ['prune', '--production'],
      passGruntFlags: true,
      limit: Math.max(require('os').cpus().length, 2)
    })

    let projects = this.data.projects || this.data

    if (Array.isArray(projects)) {
      const res = {}
      projects.forEach(el => {
        res[el] = 'default'
      })
      projects = res
    }

    async.eachLimit(Object.keys(projects), options.limit, (path, next) => {
      let tasks = projects[path]
      if (!(Array.isArray(tasks))) {
        tasks = [tasks]
      }

      glob('Gruntfile.{js,coffee}', {
        nocase: true,
        cwd: path
      }, (err, files) => {
        if (err || files.length === 0) {
          grunt.fail.warn('The "' + path + '" directory is not valid, or does not contain a Gruntfile.')
          return next()
        }

        if (options.npmInstall) {
          runNpmInstall(path, options, () => {
            runGruntTasks(path, tasks, options, options.npmClean ? () => {
              runNpmClean(path, options, next)
            } : next)
          })
        } else {
          runGruntTasks(path, tasks, options, next)
        }
      })
    }, cb)
  })
}
