const expect = require('chai').expect;
const checker = require('../index.js');

describe('checker.httpCheck()', function () {
  it('should make http request and report status >= 0 (site reachable)', function (done) {
    // 1. ARRANGE
    const url = 'https://www.google.com';
    // 2. ACT
    checker.httpCheck(url).once('requestEnd', (status) => {
      // 3. ASSERT
      expect(status.statusCode).to.be.greaterThan(-1);
      done();
    });
  });

  it('should make http request and report status < 0 (site unreachable)', function (done) {
    const url = 'http://d.d/';
    checker.httpCheck(url).once('requestEnd', (status) => {
      expect(status.statusCode).to.be.lessThan(0);
      done();
    });
  });

});
