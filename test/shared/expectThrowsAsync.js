const chai = require('chai');

module.exports = async (method, errorMessage) => {
  let error = null;
  try {
    await method();
  } catch (err) {
    error = err;
  }
  chai.expect(error).to.be.an('Error');
  if (errorMessage) {
    const regEx = new RegExp(errorMessage);
    chai.expect(error.message).to.match(regEx);
  }
};
