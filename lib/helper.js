const mailer = require("nodemailer");
const smtpConfig = require('./config').smtpConfig;
const mailOptions = require('./config').mailOptions;

module.exports = class helper {
  static getHost(url) {
    return url.split('//')[1].split('/')[0];
  }

  static getUri(url) {
    return '/' + url.split('//')[1].split('/').slice(1).join('/');
  }

  static sendMail(subject = null, message = null, plainMessage = '') {
    if (!subject || !message) {
      return false;
    }
    
    const options = {
      ...mailOptions,
      subject: subject,
      text: plainMessage,
      html: message
    }

    const smtpTransport = mailer.createTransport(smtpConfig);

    smtpTransport.sendMail(options, function (error, response) {
      if (error) {
        console.log({error});
      } else {
        console.log({response});
      }
      smtpTransport.close();
    });

    return true;
  }
}
