'use strict'

const fs = require('fs')

module.exports = function (grunt) {
  grunt.registerTask('default', function () {
    const done = this.async()

    fs.mkdir('tmp', () => {
      fs.writeFile('tmp/output.txt', 'success', () => {
        done()
      })
    })
  })
}
