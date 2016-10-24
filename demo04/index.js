'use strict';
module.exports = word => {
  return new Promise(resolve => {
    resolve(`Hello ${word}`);
  })
}

