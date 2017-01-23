---
layout: post
title:  "[前端] 开发技术栈"
categories: [front]
---

### Node.js, Npm
-----------------------------
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。
Node.js 的包管理器 npm，是全球最大的开源库生态系统。


### ECMAScript5, ECMAScript6(Babel)
-----------------------------
* [ECMAScript5和ECMAScript6的新特性及浏览器支持情况](http://www.jianshu.com/p/b6d76160889d){:target="_blank"}
* [(转)Babel-现在开始使用 ES6](http://www.cnblogs.com/whitewolf/p/4357916.html){:target="_blank"}


### CommonJS, AMD(RequireJS), CMD(SeaJS)
-----------------------------

用于解决Javascript模块化编程和加载

CommonJs是应用在NodeJs，是一种同步的模块机制。它的写法大致如下：

```js
var firstModule = require("firstModule");

//your code...

module.export = anotherModule
```

AMD的应用场景则是浏览器，异步加载的模块机制。require.js的写法大致如下：

```js
define(['firstModule'], function(module){
   
   //your code...
   return anotherModule
})
```

* [什么是CommonJS？](http://www.cnblogs.com/fullhouse/archive/2011/07/15/2107416.html){:target="_blank"}
* [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html){:target="_blank"}
* [webpack 前端加载工具 让 浏览器端 javascript 执行 CommonJS规范](http://yijiebuyi.com/blog/46fb97b11fb8f4055e0b04d1cecb1f69.html){:target="_blank"}
* [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html){:target="_blank"}


### Webpack
-----------------------------

```bash
## 初始化项目(项目中的各个依赖都是通过npm来管理，而npm对于我们项目的管理，则是通过package.json文件)
$ npm init

## 安装Webpack(其它相关依赖包也都通过npm进行安装管理，安装至项目的node_modeles目录中)
$ npm install --save-dev webpack

## 构造项目目录结构
$ tree -L 1
.
├── src                         # 源码目录，可以按mvc等模式进行结构分层
├── build                       # 通过webpack编译后的文件目录，最终通过该目录进行交付部署
├── dev-server.js               # 通过node.js的web服务器框架express进行服务部署的入口脚本
├── node_modules                # 通过npm安装的各依赖包的目录
├── package.json                # 项目描述和包依赖管理配置
├── webpack.config.js           # webpack配置
├── webpack.dev.config.js       #
└── webpack.prod.config.js      #

## 用于将打包后的js文件自动插入到html中
$ npm i html-webpack-plugin --save-dev

## 通过使用express构造web服务器并且使用中间件，可以达到不需要编译构建便可进行源码的效果查看
$ npm install express webpack-dev-middleware webpack-hot-middleware --save-dev

## css文件抽离插件
$ npm install extract-text-webpack-plugin --save-dev
```

* [ 入门Webpack，看这篇就够了](http://blog.csdn.net/kun5706947/article/details/52596766){:target="_blank"}
* [一小时包教会 —— webpack 入门指南](http://www.w2bc.com/Article/50764){:target="_blank"}
* [webpack-howto](https://github.com/petehunt/webpack-howto/blob/master/README-zh.md){:target="_blank"}


### Vue.js
-----------------------------

VueJS官方基于webpack提供了两种项目模板，分别是vue-webpack-simple模板和vue-webpack模板。

基于该项目模板，会自动在项目中集成了webpack开发和打包的环境，
也就是上述提到的webpack的相关安装和使用过程可以暂时忽略掉，把更多精力投入到项目开发中。

```bash
## 安装完vue cli后，就可以基于vue-webpack-simple模板和vue-webpack模板创建项目了
$ npm install -g vue-cli

## 创建一个基于webpack-simple模板的项目，名称为my-webpack-simple-demo
$ vue init webpack-simple my-webpack-simple-demo

## 安装项目依赖
$ cd my-webpack-simple-demo
$ npm install

## 运行示例
$ npm run dev

## 发布
$ npm run build
```

* [webpack + vuejs 基本配置（一）](http://www.cnblogs.com/lhweb15/p/5660609.html){:target="_blank"}
* [Vue笔记二：进阶[译]用Webpack构建Vue](http://www.jianshu.com/p/a5361bff1cd8){:target="_blank"}
* [Vue.js——60分钟webpack项目模板快速入门](http://www.cnblogs.com/keepfool/p/5678427.html){:target="_blank"}
* [Vue.js——vue-router 60分钟快速入门](http://www.cnblogs.com/keepfool/p/5690366.html){:target="_blank"}
