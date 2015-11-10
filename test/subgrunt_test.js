'use strict';

var grunt = require('grunt');
var fs = require('fs');

var read = function (src) {
    return grunt.util.normalizelf(grunt.file.read(src));
};

exports.subgrunt = {

    simple: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/simple/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "simple" task'
        );

        test.done();
    },

    array: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/array/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "array" task'
        );

        test.done();
    },

    multiple: function (test) {
        test.expect(2);

        var actual1 = read('test/fixtures/multiple/tmp/output-1.txt');
        var expected1 = 'success';

        test.equal(
            expected1,
            actual1,
            'should create a file with "success" in it after running the "multiple/multiple-1" task'
        );

        var actual2 = read('test/fixtures/multiple/tmp/output-2.txt');
        var expected2 = 'success';

        test.equal(
            expected2,
            actual2,
            'should create a file with "success" in it after running the "multiple/multiple-2" task'
        );

        test.done();
    },

    multipleTasks: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/multipleTasks/tmp/output.txt');
        var expected = 'two';

        test.equal(
            expected,
            actual,
            'should create a file with "two" in it after running the "multipleTask" tasks'
        );

        test.done();
    },

    customOptions: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/customOptions/tmp/output.txt');
        var expected = 'foo';

        test.equal(
            expected,
            actual,
            'should created a file with "foo" in it after running the "customOptions" task'
        );

        test.done();
    },

    noProjectsObject: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/noProjectsObject/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "noProjectsObject" task'
        );

        test.done();
    },

    npmInstall: function (test) {
        test.expect(2);

        var exists = fs.existsSync('test/fixtures/npmInstall/node_modules/async');

        test.ok(
            exists,
            'should install npm dev dependencies and "async" module should exist in "node_modules" directory'
        );

        var actual = read('test/fixtures/npmInstall/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "npmInstall" task'
        );

        test.done();
    },

    npmClean: function (test) {
        test.expect(2);

        var exists = fs.existsSync('test/fixtures/npmClean/node_modules/async');

        test.ok(
            !exists,
            'should remove npm dev dependencies and "async" module should be cleaned from "node_modules" directory'
        );

        var actual = read('test/fixtures/npmClean/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "npmClean" task'
        );

        test.done();
    },

    customCase: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/customCase/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "customCase" task'
        );

        test.done();
    },

    coffee: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/coffee/tmp/output.txt');
        var expected = 'success';

        test.equal(
            expected,
            actual,
            'should create a file with "success" in it after running the "coffee" task'
        );

        test.done();
    },

    gh19: function (test) {
        test.expect(1);

        var actual = read('test/fixtures/gh19/tmp/output.txt');
        var expected = '--aboolean';

        test.equal(
            expected,
            actual,
            'should create a file with "--aboolean" in it after running the "gh19" task'
        );

        test.done();
    }
};
