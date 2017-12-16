'use strict'

const fs = require('fs')
const grunt = require('grunt')

const read = function (src) {
  return grunt.util.normalizelf(grunt.file.read(src))
}

exports.subgrunt = {
  simple(test) {
    test.expect(1)

    const actual = read('test/fixtures/simple/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "simple" task'
    )

    test.done()
  },

  array(test) {
    test.expect(1)

    const actual = read('test/fixtures/array/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "array" task'
    )

    test.done()
  },

  multiple(test) {
    test.expect(2)

    const actual1 = read('test/fixtures/multiple/tmp/output-1.txt')
    const expected1 = 'success'

    test.equal(
      expected1,
      actual1,
      'should create a file with "success" in it after running the "multiple/multiple-1" task'
    )

    const actual2 = read('test/fixtures/multiple/tmp/output-2.txt')
    const expected2 = 'success'

    test.equal(
      expected2,
      actual2,
      'should create a file with "success" in it after running the "multiple/multiple-2" task'
    )

    test.done()
  },

  multipleTasks(test) {
    test.expect(1)

    const actual = read('test/fixtures/multipleTasks/tmp/output.txt')
    const expected = 'two'

    test.equal(
      expected,
      actual,
      'should create a file with "two" in it after running the "multipleTask" tasks'
    )

    test.done()
  },

  customOptions(test) {
    test.expect(1)

    const actual = read('test/fixtures/customOptions/tmp/output.txt')
    const expected = 'foo'

    test.equal(
      expected,
      actual,
      'should created a file with "foo" in it after running the "customOptions" task'
    )

    test.done()
  },

  noProjectsObject(test) {
    test.expect(1)

    const actual = read('test/fixtures/noProjectsObject/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "noProjectsObject" task'
    )

    test.done()
  },

  npmInstall(test) {
    test.expect(2)

    const exists = fs.existsSync('test/fixtures/npmInstall/node_modules/async')

    test.ok(
      exists,
      'should install npm dev dependencies and "async" module should exist in "node_modules" directory'
    )

    const actual = read('test/fixtures/npmInstall/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "npmInstall" task'
    )

    test.done()
  },

  npmClean(test) {
    test.expect(2)

    const exists = fs.existsSync('test/fixtures/npmClean/node_modules/async')

    test.ok(
      !exists,
      'should remove npm dev dependencies and "async" module should be cleaned from "node_modules" directory'
    )

    const actual = read('test/fixtures/npmClean/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "npmClean" task'
    )

    test.done()
  },

  customCase(test) {
    test.expect(1)

    const actual = read('test/fixtures/customCase/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "customCase" task'
    )

    test.done()
  },

  coffee(test) {
    test.expect(1)

    const actual = read('test/fixtures/coffee/tmp/output.txt')
    const expected = 'success'

    test.equal(
      expected,
      actual,
      'should create a file with "success" in it after running the "coffee" task'
    )

    test.done()
  },

  gh19(test) {
    test.expect(1)

    const actual = read('test/fixtures/gh19/tmp/output.txt')
    const expected = '--aboolean'

    test.equal(
      expected,
      actual,
      'should create a file with "--aboolean" in it after running the "gh19" task'
    )

    test.done()
  }
}
