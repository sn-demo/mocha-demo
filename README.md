# mocha-demo

## 前言

测试主要使用到的工具是测试框架、断言库以及代码覆盖率工具。测试主要提供了清晰简明的语法来描述测试用例，以及对测试用例分组，测试框架会抓取到代码抛出的AssertionError，并增加一大堆附加信息，比如那个用例挂了，为什么挂等等。

### 测试框架

测试框架通常提供TDD（测试驱动开发）或BDD（行为驱动开发）的测试语法来编写测试用例，关于TDD和BDD的对比可以看一篇比较知名的文章[The Difference Between TDD and BDD](http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)。

TDD(Test Drivin Development)是测试驱动开发，强调的是一种开发方式，以测试来驱动整个项目，即先根据接口完成测试编写，然后在完成功能时要不断通过测试，最终目的是通过所有测试。

BDD(Behavior Drivin Development)行为驱动开发，可以理解为也是TDD的分支，即也是测试驱动，但BDD强调的是写测试的风格，即测试要写得像自然语言，运用一些比如expect、should等跟自然语言相近的断言，让项目的各个成员甚至产品都能看懂测试，甚至编写测试。

下面列举写常用的测试框架：

- [Mocha](https://mochajs.org/)

  支持TDD也支持BDD。

  **优点：**

  - 终端显示友好
  - 灵活，扩展性好

  **缺点：**

  - 自身集成度不高（没有断言，spy，异步等），而且经常要配合Chai，Sinon等库使用
  - 配置相对麻烦一点点

- [Jasmine](http://jasmine.github.io/)

  只支持BDD。

  **优点：**

  - 集成度高，自带BBD，spy，方便的异步支持
  - 配置方便

  **缺点：**

  - 相对不太灵活
  - 由于各种功能内建，断言方式或者异步等风格相对比较固定
  - 没有自带mockserver， 如果需要这功能的得另外配置

- [jest](https://github.com/facebook/jest)

  jest是facebook基于Jasmine开发出的一套针对React和React Native的测试框架。

### 断言库

断言库提供了很多语义化的方法来对值做各种各样的判断。

- [Should.js](https://shouldjs.github.io/)
- [chai](http://chaijs.com/)
- [expect.js](https://github.com/Automattic/expect.js)
- [原生assert库](https://nodejs.org/api/assert.html)
- [better-assert](https://github.com/visionmedia/better-assert) 
- [unexpected](http://unexpected.js.org/)

### 代码覆盖率

为代码在语法级分支上打点，运行了打点后的代码，根据运行结束后收集到的信息和打点时的信息来统计出当前测试用例的对源码的覆盖情况。

- [istanbul](https://github.com/gotwarlost/istanbul)

### 小结

个人推荐使用`Mocha + Chai + Sinon + istanbul`结合更合适，本demo就是基于这个配合的。

## demo

以下demo都是采用mocha测试框架和chai断言库编写。

### 一些术语

后面看不懂，可以回来看，都不分大小写。

- HOOKS（钩子）

  其实就是回调函数，可以简单理解为完成某个测试之前或之后的回调函数，后续会讲。


- SUITE-LEVEL
- TEST-LEVEL
- HOOK-LEVEL

大致归纳为

SUITE-LEVEL >= TEST-LEVEL + HOOK-LEVEL。

```js
describe("",function(){
  before(function(){
    //这里是HOOK-LEVEL
  })
  //decribe里面的是SUITE-LEVEL
  it("",function(){
    //it这里是TEST-LEVEL
  })
})
```

### 提醒

**注意：**在使用Mocha的`this`上下文的方法（如this.slow，this.retries等），不要使用es6的`=>`（箭头函数），要不然上下文会失效。

官方建议最好全部不使用箭头函数。先忙的前几个demo都使用了箭头函数（当时还没注意到，这里提醒下，我就不改了。），虽然没问题，但还是最好别这样用。

### 第一个例子-demo01

首先安装`npm install --save-dev mocha chai`，编写简单的程序`Hollow World!`。

index.js

```js
'use strict';
module.exports = () => {
  return 'Hello World!';
}
```

test.js

```js
require('chai').should() 
const index = require('./index');
//describe相当于分组
describe('index.js', () => {
  //这里it()函数定义了一个测试用例，通过Should.js提供的api
  it('should get "Hello World!"', () => {
    index().should.equal('Hello World!');
  });
});
```

在demo01当前文件夹运行命令`../node_modules/.bin/_mocha`，查看测试结果。

### 变化参数测试-demo02

测试会变的参数。

index.js

```js
'use strict';
module.exports = (msg) => {
  return "Welcome to " + msg;
}
```

test.js

```js
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
```

`afert`和`before`可以看后续的`hook`，暂时不说。

在demo02当前文件夹运行命令`../node_modules/.bin/_mocha`，查看测试结果。

### 异步代码测试-demo03

index.js

```js
'use strict';
module.exports = (msg,callback) => {
  var contents = "Welcome to " + msg;
  return callback(contents);
}
```

test.js

```js
require('chai').should(); 
const index = require('./index');
let bu = "none";
//describe相当于分组
describe('index.js', () => {
  //这里it()函数定义了一个测试用例
  it('should get "Welcome to Shenzhen"', done => {
    index("Shenzhen",msg => {
      msg.should.equal("Welcome to Shenzhen");
      done();
    })
  });
});
```

这里传入`it`的第二个参数的函数新增了一个`done`参数，当有这个参数时，这个测试用例会被认为是异步测试，只有在`done()`执行时，才认为测试结束。那如果`done()`一直没有执行呢？Mocha会触发自己的超时机制，超过一定时间（默认是2s，时长可以通过`--timeout`参数设置）就会自动终止测试，并以测试失败处理。

在demo03当前文件夹运行命令`../node_modules/.bin/_mocha`，查看测试结果。

### Promise测试-demo04

需要使用chai插件`chai-as-promised`，`npm install chai-as-promised —save`。详细api请看[http://chaijs.com/plugins/chai-as-promised/](http://chaijs.com/plugins/chai-as-promised/)。

index.js

```js
'use strict';
module.exports = word => {
  return new Promise(resolve => {
    resolve(`Hello ${word}`);
  })
}
```

test.js

```js
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
```

在demo04当前文件夹运行命令`../node_modules/.bin/_mocha`，查看测试结果。

### 代码覆盖率-demo05

需要`npm install istanbul --save-dev`安装`istanbul`，代码覆盖率第三方库。

运行在当前的demo05目录运行`../node_modules/.bin/istanbul cover ../node_modules/.bin/_mocha`。在终端会看到如下信息：

```sh
index.js
    ✓ should get "Hello World!"
    1 passing (9ms)
=============================================================================
Writing coverage object [/Users/Sam/code/mocha-demo/demo05/coverage/coverage.json]
Writing coverage reports at [/Users/Sam/code/mocha-demo/demo05/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 13/13 ) 
Branches     : 50% ( 1/2 ) 
Functions    : 100% ( 0/0 )
Lines        : 100% ( 13/13 )
================================================================================
```

- statements：可执行语句执行情况
- branches：分支执行情况，比如if就会产生两个分支，我们只运行了其中的一个
- Functions：函数执行情况
- Lines：行执行情况

这些指标就是我们bug调试的主要地方，一般都覆盖100%，基本可以安心了。

运行完成后，项目下会多出一个`coverage`文件夹，这里就是放代码覆盖率结果的地方，它的结构大致如下：

```
.
├── coverage.json
├── lcov-report
│   ├── base.css
│   ├── index.html
│   ├── prettify.css
│   ├── prettify.js
│   ├── sort-arrow-sprite.png
│   ├── sorter.js
│   └── test
│       ├── index.html
│       └── index.js.html
└── lcov.info
```

直接用浏览器访问`Icov-report/index.html`查看详细情况。

### hooks-demo06

`hooks`（钩子），执行前或执行后触发的动作。`Mocha` 提供的hooks 有`before()`,、`after()`,、`beforeEach()`、 和 `afterEach()`。从字面意思很清楚了，执行顺序看下面例子（demo06）。

test.js

```js
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
  before("所有测试前执行",()=>{
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
```

运行测试后终端输出结果如下：

```sh
index.js
-----------------------------------before:1
-----------------------------------beforeEach:1
✓ 第一次
-----------------------------------afterEach_num:1
-----------------------------------beforeEach:2
✓ 第二次
-----------------------------------afterEach_num:2
-----------------------------------after:1
2 passing (16ms)
```

结果顺序为`before->beforeEach->afterEach->beforeEach->afterEach->after`；说明before在所有测试前执行，after在所有测试后执行；beforeEach在会循环，每个测试前都会跑一边；afterEach在每个测试后跑一遍。

#### DESCRIBING HOOKS（描述hooks）

只是用来描述，辅助作用。如：

```js
//没描述
beforeEach(function() {
  // beforeEach hook
});
//使用函数名当描述
beforeEach(function namedFun() {
  // beforeEach:namedFun
});
//参数描述
beforeEach('一些描述', function() {
  // beforeEach:some description
});
```

#### 异步HOOKS

跟异步测试原理一样，需要运行done()，才算完成异步hooks。

```js
beforeEach(function(done) {
  done();
});
```

### 延时-demo07

当我们想在所有测试完成后才执行异步的测试，就需要利用Mocha延时了（运行命令需要加上`--delay`，并会返回回调函数`run`）。delay测试代码格式如下：

```js
//需要setTimeout包装起来
setTimeout(function() {
  // do some setup
  describe('my suite', function() {
    // ...
  });
  run();//必须要调用run()
}, 5000);
```

test.js

```js
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
```

demo07当前文件夹运行命令`../node_modules/.bin/_mocha --delay`查看终端效果。

### EXCLUSIVE TESTS(独有测试)-dem08

附加`.only()`方法可以让我们只运行指定的测试组，v3.00之前版本只识别当前组中唯一一个only，后续版本支持多个）。注意：`hooks`是不会受影响的。

test.js

```js
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
```

demo08当前文件夹运行命令`../node_modules/.bin/_mocha`查看终端效果。

###  INCLUSIVE TESTS-demo09

这个跟`EXCLUSIVE TESTS`是相反的，通过附加`.skip()`可以忽略某个测试组，并标记为`pending`状态。

test.js

```js
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
  it.skip('should get "Hello World!"', (done) => {
    //没运行，被标记为pending
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  it.skip('should get "Hello World!"', (done) => {
    //没运行，被标记为pending
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
  it('运行了', (done) => {
    index("World!").should.eventually.equal("Hello World!").notify(done);
  });
});
```

demo09当前文件夹运行命令`../node_modules/.bin/_mocha`，运行结果如下：

```sh
index.js
hooks是不会受影响的！
- should get "Hello World!"
- should get "Hello World!"
✓ 运行了
1 passing (14ms)
2 pending
```

### 重复测试-demo10

**重复测试是指在测试失败的情况下才会进行重复测试。**`Mocha`虽然支持重复测试，但是官方是不建议在单元测试中使用这个重复测试的。

> It’s not recommended to use this feature for unit tests.

test.js

```js
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
```

这里不要使用箭头函数，要不`this.retries`会失效！

demo10当前文件夹运行命令`../node_modules/.bin/_mocha`，运行结果如下：

```sh
index.js
重复运行1次
重复运行2次
重复运行3次
重复运行4次
1) should get "Hello World!"
0 passing (21ms)
1 failing
1) index.js should get "Hello World!":
  AssertionError: expected 'Hello World!' to equal 'Hello!'
  + expected - actual
  -Hello World!
  +Hello!
```

### 动态创建测试-demo11

`Mocha`可以动态创建测试，就是说可以在`forEach`中使用`it`等。

test.js

```js
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
```

demo11当前文件夹运行命令`../node_modules/.bin/_mocha`，终端查看测试结果。

### 测试持续时间（TEST DURATION）-demo12

上面的demo测试完成后，只显示总的测试时间（因为测试够快，当测试慢的时候会显示每个测试时间的），`Mocha`提供`this.slow(xxx)`函数修改测试时间间隔值，其中参数是毫秒。默认运行`this.slow`为70ms，不可禁用。

计算公式如下：

- 时间按显示红色 = 测试时间 > 设置时间
- 时间显示黄色 = 设置时间 > 测试时间  >= 设置时间 / 2
- 不显示时间 = 测试时间 *2 < 设置时间

test.js

````js
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
````

demo12当前文件夹运行命令`../node_modules/.bin/_mocha`，终端查看测试结果。

### 超时设置-demo13

默认超时是2000ms，当然也可以通过`this.timeout(xxx)`设置。

test.js

```js
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
```

demo13当前文件夹运行命令`../node_modules/.bin/_mocha`，终端查看测试结果。



## 参考文章

- [前端自动化测试工具 overview](http://imweb.io/topic/56895ae54c44bcc56092e40a)
- [聊一聊前端自动化测试](https://github.com/tmallfe/tmallfe.github.io/issues/37)
- [官网例子](https://mochajs.org/#examples)