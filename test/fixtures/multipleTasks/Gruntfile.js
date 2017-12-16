'use strict'

const fs = require('fs')

module.exports = function (grunt) {
  grunt.registerTask('one', function () {
    const done = this.async()

    fs.mkdir('tmp', () => {
      fs.writeFile('tmp/output.txt', 'one', () => {
        done()
      })
    })
  })

  grunt.registerTask('two', function () {
    const done = this.async()

    fs.writeFile('tmp/output.txt', 'two', () => {
      done()
    })
  })
}
