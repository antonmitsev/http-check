const expect = require('chai').expect;
const httpCheck = require('../index.js');

describe('httpCheck()', function () {
  it('should make http request', function () {
    // 1. ARRANGE
    const url = 'http://localost/';
    const response = 'pong';

    // 2. ACT
    var check = httpCheck(url);

    // 3. ASSERT
    expect(check).to.be.equal(response);
  });
});
