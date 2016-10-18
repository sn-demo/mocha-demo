require('should');
const index = require('./index');
//describe相当于分组
describe('index.js', () => {
  //这里it()函数定义了一个测试用例，通过Should.js提供的api
  it('should get "Hello World!"', () => {
    index().should.be.eql('Hello World!');
  });
});
