const chai = require('chai');
const fs = require('fs');
const path = require('path');

const expectThrowsAsync = require('../shared/expectThrowsAsync');

describe('The Runner Authorization Module', function() {
  let performer;

  before(function() {
    delete require.cache[require.resolve('simple-git')];
    require.cache[require.resolve('simple-git')] = {
      exports: function() {
        return {
          catFile: function(argArray) {
            return new Promise(function(resolve, reject) {
              if (argArray[1].includes('943ac77e2f118d9f9950b4265f3b3c4e3639be8f')) {
                resolve(fs.readFileSync(path.resolve(__dirname, '../../test-data/valid.gitlab-ci.yml'), {encoding: 'utf-8'}));
              } else if (argArray[1].includes('5bb9e579cb1518ceb6a45126527aea0877854d8a')) {
                resolve(fs.readFileSync(path.resolve(__dirname, '../../test-data/invalid.gitlab-ci.yml'), {encoding: 'utf-8'}));
              } else {
                throw new Error('Unexpected Test Case');
              }
            });
          }
        };
      }
    };
    delete require.cache[require.resolve('../../src/performers/01-runner-authorization')];
    performer = require('../../src/performers/01-runner-authorization');
  });

  after(function() {
    delete require.cache[require.resolve('simple-git')];
    delete require.cache[require.resolve('../../src/performers/01-runner-authorization')];
  });

  it('should return success when the production runner is restricted to the production branch.', function() {
    return performer.perform('refs/heads/master', '1a6433a6fd254131a11e66f6a77fefc2c11d2a98', '943ac77e2f118d9f9950b4265f3b3c4e3639be8f').then((response) => {
      chai.expect(response).to.be.true;
    });
  });

  it('should return an error when the production runner is not restricted to the production branch.', async function() {
    await expectThrowsAsync(() => performer.perform('refs/heads/master', '943ac77e2f118d9f9950b4265f3b3c4e3639be8f', '5bb9e579cb1518ceb6a45126527aea0877854d8a'), 'Only the production branch can target the production Gitlab runner.');
  });
});
