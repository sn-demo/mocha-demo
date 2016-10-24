require('chai').should(); 
const index = require('./index');
let bu = "none";
//describe相当于分组
describe('index.js', function() {
  this.slow(100);
  describe('Welcome to Beijing', function() {
    //超过时间显示为红色
    it('should get "Welcome to Beijing"', function() {
      index("Beijing").should.equal('Welcome to Beijing');
    });
  });
  describe('Welcome to Beijing', function() {
    //测试时间小于设定时间一定范围显示为黄色
    //目前观察，应该是小于2倍运行时间
    this.slow(897);
    it('should get "Welcome to Beijing"', function() {
      index("Beijing").should.equal('Welcome to Beijing');
    });
  });
  describe('Welcome to Shenzhen', function() {
    //会覆盖上面的设置，因为设定时间大于此测试运行时间一定范围，所以没有显示时间
    //目前观察，应该是大于2倍运行时间
    this.slow(2000);
    it('should get "Welcome to Shenzhen"', function() {
      index("Shenzhen").should.equal('Welcome to Shenzhen');
    });
  });
});
