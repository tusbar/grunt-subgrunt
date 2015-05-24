'use strict';

fs = require 'fs'

module.exports = (grunt) ->
    grunt.registerTask('default', () ->
        done = this.async()

        fs.mkdir('tmp', () ->
            fs.writeFile('tmp/output.txt', 'success', () ->
                done()
            )
        )
    )
