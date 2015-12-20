'use strict';

var grunt = require('grunt');
var exec = require('child_process').exec;


exports.exists = {
  shouldFindAllFiles: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:all"', function (error, stdout, stderr) {
      test.ifError(error);
      test.done();
    });
  },

  shouldFindAllFilesAndFailAnyway: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:all_fail"', function (error, stdout, stderr) {
      test.ok(error);
      test.done();
    });
  },

  shouldNotFindAnyFilesAndFail: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:none"', function (error, stdout, stderr) {
      test.ok(error);
      test.done();
    });
  },

  shouldNotFindAnyFilesAndCatch: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:none_catch"', function (error, stdout, stderr) {
      test.ifError(error);
      test.done();
    });
  },

  shouldNotFindAllFiles: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:some"', function (error, stdout, stderr) {
      test.ok(error);
      test.done();
    });
  },
  
  shouldNotFailOnEmptySetOfFiles: function (test) {
    test.expect(1);

    exec('grunt "fileMissing:empty"', function (error, stdout, stderr) {
      test.ifError(error);
      test.done();
    });
  }
};