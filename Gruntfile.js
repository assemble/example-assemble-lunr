/*
 * example-assemble-toc
 * https://github.com/assemble/example-assemble-toc
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,
    site: grunt.file.readYAML('_config.yml'),

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        site: '<%= site %>',
        assets: '_gh_pages/assets',
        partials: ['templates/includes/*.hbs'],
        plugins: ['assemble-contrib-lunr'],
        layouts: 'templates/layouts',
        lunr: {
          dataPath: '_gh_pages/assets/search_data.json'
        }
      },
      example: {
        files: {'_gh_pages/': ['templates/*.hbs']}
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 1337,
          base: '_gh_pages'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['_gh_pages/*.html']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'assemble']);
};
