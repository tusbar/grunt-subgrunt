'use strict'

var fs = require('fs')

module.exports = function (grunt) {
  grunt.registerTask('build', function () {
    var done = this.async()

    fs.mkdir('tmp', function () {
      fs.writeFile('tmp/output.txt', 'success', function () {
        done()
      })
    })
  })
}
