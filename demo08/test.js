var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 
const index = require('./index');

//describe相当于分组
describe('index.js', () => {
  before(function(){
    console.log("hooks是不会受影响的！")
  })
  //这里it()函数定义了一个测试用例
  it.only('should get "Hello World!"', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  //可以去掉这个only看下效果
  it.only('should get "Hello World!"', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  //这个没运行
  it('should get "Hello World!"', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
});
    
