var chai = require('chai')
var chaiAsPromised = require('chai-as-promised'); 
chai.should(); 
//使用chai-as-promised插件
chai.use(chaiAsPromised); 

const index = require('./index');
let before_num = 0;
let beforeEach_num = 0;
let after_num = 0;
let afterEach_num = 0;
//describe相当于分组
describe('index.js', () => {
  before(()=>{
    before_num++;
    console.log("-----------------------------------before:%s",before_num);
  })
  beforeEach(()=>{
    beforeEach_num++;
    console.log("-----------------------------------beforeEach:%s",beforeEach_num);
  })
  afterEach(()=>{
    afterEach_num++;
    console.log("-----------------------------------afterEach_num:%s",afterEach_num);
  })
  after(()=>{
    after_num++;
    console.log("-----------------------------------after:%s",after_num);
  })
  //这里it()函数定义了一个测试用例
  it('第一次', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  it('第二次', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
});
