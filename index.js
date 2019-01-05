require ('./lib/config.js');

module.exports = {
  checker: require ('./lib/checker.js'),
  sendMail: require ('./lib/helper.js').sendMail
}
