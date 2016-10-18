require('chai').should(); 
const index = require('./index');
let bu = "none";
//describe相当于分组
describe('index.js', () => {
  describe('Welcome to Shenzhen', () => {
    //每个分组的所有测试用例运行前，这里相对于bu赋值
    before(() => bu = 'Shenzhen');
    //每个分组的所有测试用例运行后，这里相对于重置bu值
    after(() => bu = 'none');
    //这里it()函数定义了一个测试用例，通过Should.js提供的api
    it('should get "Welcome to Shenzhen"', () => {
      index(bu).should.equal('Welcome to Shenzhen');
    });
  });
  describe('Welcome to Beijing', () => {
    before(() => bu = 'Beijing');
    after(() => bu = 'none');
    it('should get "Welcome to Beijing"', () => {
      index(bu).should.equal('Welcome to Beijing');
    });
  });
});
