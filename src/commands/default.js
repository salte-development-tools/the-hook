const fs = require('fs');
const path = require('path');

module.exports.exec = async (argv) => {
  const performersPath = path.resolve(__dirname, '../performers');
  const performers = fs.readdirSync(performersPath, {encoding: 'utf-8'});
  console.log('*******************************************************************************');
  console.log(`* ${performers.length} ${performers.length > 1 ? 'performers are' : 'performer is'} preparing to take the stage!`);
  console.log('*******************************************************************************');
  for (let i = 0; i < performers.length; i++) {
    console.log(`  - The current performer is: ${performers[i]}`);
    const performer = require(path.resolve(performersPath, performers[i]));
    await performer.perform(argv.refname, argv.oldrev, argv.newrev);
  }
  console.log('\n*** None of the registered performers got the hook! ***\n');
};
