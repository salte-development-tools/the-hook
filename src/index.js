const yargs = require('yargs');

yargs.usage('$0 <refname> <oldrev> <newrev>', 'Run registered performers against the current Git repository.', (yargs) => {
  yargs.positional('refname', {
    describe: 'The name of the reference being pushed to.',
    type: 'string'
  }).positional('oldrev', {
    describe: 'The old revision prior to the push.',
    type: 'string'
  }).positional('newrev', {
    describe: 'The new revision being pushed.',
    type: 'string'
  });
}, require('./commands/default').exec).showHelpOnFail(false).argv;
