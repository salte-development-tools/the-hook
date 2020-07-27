const chai = require('chai');
const sinon = require('sinon');

const performer = require('../../src/performers/01-runner-authorization.js');
const command = require('../../src/commands/default');

describe('The default command', function() {
  it('should return successfully when all performers return successfully.', function() {
    const stub = sinon.stub(performer, 'perform').resolves(true);
    return command.exec({
      refname: 'refname',
      oldrev: 'oldrev',
      newrev: 'newrev'
    }).then(() => {
      chai.expect(stub.called).to.be.true;
    }).finally(() => {
      stub.restore();
    });
  });

  it('should throw an error when a performer throws an error.', function() {
    const stub = sinon.stub(performer, 'perform').throws(new Error('Injected Error'));
    return command.exec({
      refname: 'refname',
      oldrev: 'oldrev',
      newrev: 'newrev'
    }).then((response) => {
      chai.assert.fail(`The command returned ${response} but an error was expected.`);
    }).catch((error) => {
      chai.expect(error.message).to.equal('Injected Error');
    }).finally(() => {
      stub.restore();
    });
  });
});
