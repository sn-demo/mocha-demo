require('chai').should(); 
const index = require('./index');
let bu = "none";
//describe相当于分组
describe('index.js', () => {
  //这里it()函数定义了一个测试用例
  it('should get "Welcome to Shenzhen"', done => {
    index("Shenzhen",msg => {
      msg.should.equal("Welcome to Shenzhen");
      done();
    })
  });
});
