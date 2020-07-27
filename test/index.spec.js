const path = require('path');
const exec = require('child-process-promise').exec;
const expect = require('chai').expect;

describe('The root module entry point', function() {
  before(function() {
    process.chdir(path.resolve(__dirname, '../test-data'));
  });

  it('should return a missing argument error message when no arguments are passed', function() {
    return exec(`node ${path.resolve(__dirname, '../bin/the-hook.js')}`).then(function() {
      return 'Allowed to pass an invalid number of arguments!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Not enough non-option arguments: got 0, need at least 3/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });

  it('should return a missing argument error message when one argument is passed', function() {
    return exec(`node ${path.resolve(__dirname, '../bin/the-hook.js')} one`).then(() => {
      return 'Allowed to pass an invalid number of arguments!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Not enough non-option arguments: got 1, need at least 3/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });

  it('should return a missing argument error message when two arguments are passed', function() {
    return exec(`node ${path.resolve(__dirname, '../bin/the-hook.js')} one two`).then(() => {
      return 'Allowed to pass an invalid number of arguments!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Not enough non-option arguments: got 2, need at least 3/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });
});
