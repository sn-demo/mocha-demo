var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 

const index = require('./index');
let bu = "none";
//describe相当于分组
describe('index.js', () => {
  //这里it()函数定义了一个测试用例
  it('should get "Hello World!"', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  //或者不需要done参数,需要return
  //it('should get "Hello World!"', () => {
    //return index("World!").should.eventually.equal("Hello World!").notify(done);
  //});
});
