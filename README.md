# mocha-demo

## 前言

测试主要使用到的工具是测试框架、断言库以及代码覆盖率工具。测试主要提供了清晰简明的语法来描述测试用例，以及对测试用例分组，测试框架会抓取到代码抛出的AssertionError，并增加一大堆附加信息，比如那个用例挂了，为什么挂等等。

### 测试框架

测试框架通常提供TDD（测试驱动开发）或BDD（行为驱动开发）的测试语法来编写测试用例，关于TDD和BDD的对比可以看一篇比较知名的文章[The Difference Between TDD and BDD](http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)。

TDD(Test Drivin Development)是测试驱动开发，强调的是一种开发方式，以测试来驱动整个项目，即先根据接口完成测试编写，然后在完成功能时要不断通过测试，最终目的是通过所有测试。

BDD(Behavior Drivin Development)行为驱动开发，可以理解为也是TDD的分支，即也是测试驱动，但BDD强调的是写测试的风格，即测试要写得像自然语言，运用一些比如expect、should等跟自然语言相近的断言，让项目的各个成员甚至产品都能看懂测试，甚至编写测试。

下面列举写常用的测试框架：

- [Mocha](https://mochajs.org/)

  支持TDD也支持BDD，

- [Jasmine](http://jasmine.github.io/)

  只支持BDD

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

## demo

以下demo都是采用mocha测试框架和chai断言库编写。

### demo01

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

### demo02

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

### demo03



## 参考文章

- [前端自动化测试工具 overview](http://imweb.io/topic/56895ae54c44bcc56092e40a)

