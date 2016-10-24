var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 
const index = require('./index');

setTimeout(function() {
    //describe相当于分组
    describe('index2.js', () => {
      //这里it()函数定义了一个测试用例
      it('should get "Hello World!"', (done) => {
        index("World!").should.eventually.equal("Hello World!").notify(done);
        console.log("----------%s-------------","在其他测试完成后运行（不过要注意延时时间）")
      });
    });
    run();
},100);
describe('index.js', () => {
  //这里it()函数定义了一个测试用例
  it('should get "Hello World!"', () => {
    console.log("----------%s-------------","不延时")
  });
});
//console.log(this)
