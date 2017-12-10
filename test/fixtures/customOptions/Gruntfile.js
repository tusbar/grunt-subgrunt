'use strict'

var fs = require('fs')

module.exports = function (grunt) {
  var text = grunt.option('text')

  grunt.registerTask('default', function () {
    var done = this.async()

    fs.mkdir('tmp', function () {
      fs.writeFile('tmp/output.txt', text, function () {
        done()
      })
    })
  })
}
