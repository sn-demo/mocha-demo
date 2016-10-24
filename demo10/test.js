var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 
const index = require('./index');
let i = 0;
//describe相当于分组
describe('index.js', function(){
  //重复测试，是在失败的情况下才会重复测试的
  this.retries(4);
  beforeEach(function(){
    if(i != 0){
      console.log("重复运行%s次",i)
    }
    i++;
  })
  it('should get "Hello World!"', function(done) {
    //这里会测试不通过
    index("World!").should.eventually.equal("Hello!").notify(done);
  });
});
    
