require('chai').should(); 
//describe相当于分组
describe('index.js', function() {
  //suite level
  this.timeout(200);
  before(function(){
    //hook level 覆盖suite level
    //没超时
    this.timeout(200);
  })
  it('should take less than 150ms', function(done){
    //test level覆盖suite level
    this.timeout(150);
    //没超时
    setTimeout(done, 100);
  });

  it('should take less than 200ms', function(done){
    // 继承suite level
    // 超时了
    setTimeout(done, 250);
  });
});
