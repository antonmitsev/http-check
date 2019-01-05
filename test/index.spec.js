const expect = require('chai').expect;
const checker = require('../index.js').checker;
const sendMail = require('../index.js').sendMail;

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

describe('helper.sendMail()', function () {
  it('Should return FALSE on empty input variables', () => {
    expect(sendMail()).to.be.false;
    expect(sendMail('some')).to.be.false;
  });

  it('Should send e-mail', () => {
    // TODO enchance sending to catch exceptions on sending
    expect(sendMail('some subject ...', '<p>Html text</p>', 'Plain text')).to.be.true;
  })
});