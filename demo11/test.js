var chai = require('chai')
chai.should(); 
const index = require('./index');

describe('index.js', function(){
  var test = [1,2,3,4];
  test.forEach((v,k)=>{
    it(`should get "${v}"`, function() {
      index()[k].should.equal(v);
    });
  })
});
    
