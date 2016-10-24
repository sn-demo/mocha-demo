'use strict';
module.exports = word => {
  if(word == "test"){
    console.log(0)
  }
  return new Promise(resolve => {
    resolve(`Hello ${word}`);
  })
}

