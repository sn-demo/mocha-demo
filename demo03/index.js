'use strict';
module.exports = (msg,callback) => {
  var contents = "Welcome to " + msg;
  return callback(contents);
}
