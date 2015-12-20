module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    jsonlint: {
        all: {
          src: ['package.json', '.jshintrc']
        }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

    fileMissing: {
      all: {
        options: {
          files: ['test/fixtures/*.txt']
        }
      },
      all_fail: {
        options: {
          files: ['test/fixtures/*.txt'],
          exists: function(files){
            grunt.fail.warn('All files exist, but I want to error anyway!');
          }
        }
      },
      none: {
        options: {
          files: ['test/fixtures/missing.txt']
        }
      },
      none_catch: {
        options: {
          files: ['test/fixtures/missing.txt','test/fixtures/missing2.txt'],
          missing: function(file){
            grunt.log.writeln('No error for you!');
          }
        }
      },
      some: {
        options: {
          files: ['<%= fileMissing.all %>', '<%= fileMissing.none %>']
        }
      },
      empty: {
        options: {
          files: []
        }
      }
    }
  });


  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'jsonlint', 'test']);
};
