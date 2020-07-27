#!/usr/bin/env node

process.title = 'the-hook';

var semver = require('semver');

// Exit early if the user's node version is too low.
if (!semver.satisfies(process.version, '>=10')) {
  console.log(
      'The Hook CLI requires at least Node v10. ' +
      'You have ' + process.version + '.');
  process.exit(1);
}

require('../src/index');
