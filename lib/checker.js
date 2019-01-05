let _statusSent = false;
const emitter = require('events').EventEmitter;  
const e = new emitter();
const statusCodes = require('./config.js').statusCodes;
const options = require('./config.js').options;
const helper = require('./helper.js');

module.exports = class checker {
  static get statusSent () {
    return _statusSent;
  }

  static set statusSent(value) {
    return _statusSent = value;
  }

  static emmitRequestEnd (status = null) {
    clearTimeout(this.watchDog);
    if (this.statusSent === false) {
      this.statusSent = true;
      e.emit('requestEnd', status);
    }
  }

  static httpCheck (url) {
    this.statusSent = false;
    let port = 80,
      rq;
    if (url.indexOf('https://') === 0) {
      rq = require('https');;
      port = 443;
    } else {
      rq = require('http');
    }

    const request = rq.request({
      host: helper.getHost(url),
      port,
      method: 'HEAD',
      path: helper.getUri(url)
    },
      (res) => {
        this.emmitRequestEnd({
          reachable: true,
          statusCode: res.statusCode
        });
      });

    request.on('error', (err) => {
      this.emmitRequestEnd({
        reachable: false,
        statusCode: statusCodes.notReachable
      });
    });

    request.end();

    this.watchDog = setTimeout(() => {
        console.log('TODO test this part somewhow...');
        this.emmitRequestEnd({
          reachable: false,
          statusCode: statusCodes.timeout
        });
      }, options.timeoutWait);
    return e;
  }
}
