'use strict'

const fs = require('fs')

module.exports = function (grunt) {
  grunt.registerTask('default', function () {
    const done = this.async()

    const aboolean = grunt.option('aboolean')
    if (aboolean === true) {
      fs.mkdir('tmp', () => {
        fs.writeFile('tmp/output.txt', grunt.option.flags(), () => {
          done()
        })
      })
    }
  })
}
