var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 
const index = require('./index');

//describe相当于分组
describe('index.js', function(){
  before(function(){
    console.log("hooks是不会受影响的！")
  })
  //这里it()函数定义了一个测试用例
  it.skip('should get "Hello World!"', function(done) {
    //没运行，被标记为pending
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  it.skip('should get "Hello World!"', function(done) {
    //没运行，被标记为pending
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  it('运行了', function(done) {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
});
    
