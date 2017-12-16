'use strict'

const fs = require('fs')

module.exports = function (grunt) {
  const text = grunt.option('text')

  grunt.registerTask('default', function () {
    const done = this.async()

    fs.mkdir('tmp', () => {
      fs.writeFile('tmp/output.txt', text, () => {
        done()
      })
    })
  })
}
