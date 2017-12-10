# grunt-subgrunt [![Circle CI](https://circleci.com/gh/tusbar/grunt-subgrunt.svg?style=svg)](https://circleci.com/gh/tusbar/grunt-subgrunt)

[![npm version](https://img.shields.io/npm/v/grunt-subgrunt.svg)](https://www.npmjs.com/package/grunt-subgrunt)
[![Travis](https://secure.travis-ci.org/tusbar/grunt-subgrunt.svg?branch=master)](https://travis-ci.org/tusbar/grunt-subgrunt)
[![Dependencies Status](https://david-dm.org/tusbar/grunt-subgrunt.svg)](https://david-dm.org/tusbar/grunt-subgrunt)
[![Dev Dependencies Status](https://david-dm.org/tusbar/grunt-subgrunt/dev-status.svg)](https://david-dm.org/tusbar/grunt-subgrunt#info=devDependencies)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Run sub-projects' grunt tasks.
> This plugin was inspired by https://gist.github.com/cowboy/3819170.

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-subgrunt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-subgrunt');
```

## Release notes

For change logs and release notes, see the [changelog](https://github.com/tusbar/grunt-subgrunt/blob/master/changelog.md) file.

## The "subgrunt" task

### Overview
In your project's Gruntfile, add a section named `subgrunt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  subgrunt: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {
        // Target-specific options
      },
      projects: {
        // Paths to sub-projects' gruntfiles
      }
    },
  },
})
```

### Options

#### options.npmInstall
Type: `bool`  
Default value: `true`

Determines wether `npm install` will be ran for the sub-project (thus installing dev dependencies).

#### options.npmClean
Type: `bool`  
Default value: `false`  
*Requires npm >= 1.3.10*

When enabled, runs `npm prune --production` to clean development dependencies.

#### options.npmPath
Type: `string`  
Default value: `'npm'`

The location of the `npm` executable. Defaults to `'npm'` as it should be available in the `$PATH` environment variable.

#### options.passGruntFlags
Type: `bool`  
Default value: `true`  

When enabled, passes the grunt.options thru to the subgrunt task.

#### options.limit
Type: `Number`  
Default value: Number of CPU cores (`require('os').cpus().length`) with a minimum of 2

Limit how many sub-grunt projects are launched concurrently.


### Usage examples

```js
grunt.initConfig({
  subgrunt: {
    target0: {
      projects: {
        // For each of these projects, the specified grunt task will be executed:
        'node_modules/module1': 'default',
        'node_modules/module2': 'bower:install'
      }
    },
    target1: {
      // Without target-specific options, the projects object is optional:
      'node_modules/module1': 'default',
      'node_modules/module2': 'bower:install'
    },
    target2: {
      // Use an array to run multiple tasks:
      'node_modules/module1': [ 'clean', 'test' ]
    },
    target3: {
      // you can use this array to add parameters:
      'node_modules/module1': [ 'clean', '--myParam="foobar"', '--verbose' ]
    },
    target4: [
      // Using an array will just execute the 'default' grunt task:
      'node_modules/module3',
      'node_modules/module4'
    ],
    target5: {
      // npm install will not be ran for this target:
      options: {
        npmInstall: false
      },
      projects: {
        'sub-projects/my-awesome-module': 'build:dist'
      }
    },
    target6: {
      // The npm devDependencies will be cleaned out after running the grunt tasks.
      options: {
        npmClean: true
      },
      projects: {
        'node_modules/module1': [ 'preprocess', 'build' ]
      }
    },
    target7: {
      // grunt option flags will not be passed to the subgrunts
      options: {
        passGruntFlags: false
      },
      projects: {
        'baz': [ 'foo', 'bar' ]
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```

![MIT](https://img.shields.io/badge/licence-MIT-blue.svg)
