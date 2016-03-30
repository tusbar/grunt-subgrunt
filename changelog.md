### v1.2.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v1.1.0...v1.2.0)

* Test with newer versions of nodejs
* Update all dependencies
* Update eslint configuration

### v1.1.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v1.0.0...v1.1.0)

* Update `async` dependency
* Replace jshint and jscs with eslint
* Pass options after tasks (reported by [ianwremmel](https://github.com/tusbar/grunt-subgrunt/issues/19))

### v1.0.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.5...v1.0.0)

* Update dependencies
* Update travis configuration (include Node.js 4.0)
* Add Circle CI tests
* Use [Semantic Versioning](http://semver.org/)

### v0.4.5 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.4...v0.4.5)

* Update dependencies
* Update travis configuration to include 0.10, 0.12 and latest iojs
* Update code quality configuration (jscs and jshint)

### v0.4.4 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.3...v0.4.4)

* Add tests (`customCase` and `coffee`)
* Update dependencies

### v0.4.3 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.2...v0.4.3)

* Improve documentation and tests

### v0.4.2 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.1...v0.4.2)

* Remove --gruntfile option when running subgrunts (by [rodolpheche](https://github.com/rodolpheche))

### v0.4.1 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.4.0...v0.4.1)

* Check for all Gruntfiles spelling variants by using glob (reported by [juriejan](https://github.com/juriejan))

### v0.4.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.3.0...v0.4.0)

* Stop buffering the subprocesses output (by [kevinconaway](https://github.com/kevinconaway))
* Remove dependencies to lpad and colors (output won’t be as nice anymore, but faster)

### v0.3.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.2.4...v0.3.0)

* Add `passGruntFlags` option to control whether grunt option flags are passed to the subgrunt tasks (by [kingbin](https://github.com/kingbin))

### v0.2.4 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.2.3...v0.2.4)

* Add `limit` option to limit the number of child processes created (by [blaiprat](https://github.com/blaiprat))

### v0.2.3 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.2.2...v0.2.3)

* Add support for Gruntfile.coffee (by [@logankoester](https://github.com/logankoester))

### v0.2.2 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.2.1...v0.2.2)

* Add `npmClean` option to remove development dependencies after running the grunt tasks (requires npm >= 1.3.10)

### v0.2.1 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.2.0...v0.2.1)

* Propagate grunt option flags to the sub-projects

### v0.2.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.1.1...v0.2.0)

* **BREAKING:** Rename `target.modules` to `target.projects`
* Improve errors output

### v0.1.1 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.1.0...v0.1.1)

* Improve overall output

### v0.1.0 [view commit logs](https://github.com/tusbar/grunt-subgrunt/compare/v0.0.1...v0.1.0)

* Allow specifying an array to run multiple tasks
* Add grunt task to lint JavaScript files

### v0.0.1

* Initial release
