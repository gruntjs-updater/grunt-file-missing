module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('fileMissing', 'Ensures that specified files exist.', function () {
    var tasks = [];
    var self = this;
    var targetName = this.target;

    // Detect target - if none specified, run all targets
    if (!targetName) {
      Object.keys(grunt.config.data[self.name]).forEach(function (discoveredTargetName) {
        if (!/^_|^options$/.test(discoveredTargetName)) {
          tasks.push(self.name + ':' + discoveredTargetName);
        }
      });
      return grunt.task.run(tasks);
    }

    var config = grunt.config.data[self.name][targetName].options;

    var files = grunt.file.expand({
      nonull: true
    }, config.files);

    grunt.log.writeln('Checking ' + files.length + ' file' + (files.length !== 1 ? 's' : '') + ' for existence...');

    var filesExist = files.every(function (file) {
      grunt.verbose.write('Checking file: ');
      grunt.verbose.subhead(file);

      var fileExists = grunt.file.exists(file);

      if (!fileExists) {
        if (config.missing){
          config.missing(file);
          fileExists = true;
        }else{
          grunt.log.error('%s doesn’t exist!', file);
        }
      }

      return fileExists;
    });


    if (filesExist) {
      if(config.exists){
        config.exists(files);
      }
      grunt.log.ok();
    }

    return filesExist;
  });
};
