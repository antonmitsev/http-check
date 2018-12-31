const events = require('events');

// Status codes returned from checker
const statusCodes = {
  notReachable: -1,
  timeout: -2,
  undefined: -1000
}

let options = {
  // Wait for answer, ms
  timeoutWait: 5000
}

let _statusSent = false;

class helper {
  static getHost(url) {
    return url.split('//')[1].split('/')[0];
  }
  static getUri(url) {
    return '/' + url.split('//')[1].split('/').slice(1).join('/');
  }
}

const emitter = require('events').EventEmitter;  
const e = new emitter();

class checker {
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
        console.log('here');
        this.emmitRequestEnd({
          reachable: false,
          statusCode: statusCodes.timeout
        });
      }, options.timeoutWait);
    return e;
  }
}

module.exports = checker;
