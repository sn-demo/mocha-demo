'use strict';
module.exports = (msg) => {
  var i= 0;
  while(i < 900000000){
    i++;
  }
  return "Welcome to " + msg;
}
