module.exports = options = {
  // Status codes returned from checker
  statusCodes: {
    notReachable: -1,
    timeout: -2,
    undefined: -1000
  },

  options: {
    // Wait for answer, ms
    timeoutWait: 5000
  },

  smtpConfig: {
    host: '',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'user@host.tld',
        pass: 'pass'
    }
  },

  mailOptions: {
    from: '"HTTP Checker" <user@host.tld>', // sender address
    to: '"HTTP Watcher" user@host.tld', // list of receivers
    subject: 'All right!', // Subject line
    text: 'All right', // plain text body
    html: '<b>All right</b>' // html body
  }
}