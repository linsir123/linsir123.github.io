---
layout: post
title:  "[Golang] 开发环境安装"
categories: [golang]
---

安装和配置过程比较简单几需要以下几步：

* 从官网下载安装包（如：go1.0.3.windows-386.msi）
* 按照默认方式进行安装（如：C:\Go）
* 配置配置以下几个环境变量
	
	+ `GOPATH` => Go开发目录
	+ `GOROOT` => Go安装目录

* 在Go的开发目录中创建三个目录

	+ `bin` => 存放项目编译后执行文件
	+ `pkg` => 存放项目编译成某个pkg
	+ `src` => 存放源项目


几个常用的Go命令

```bash
## 下载和安装某个pkg
$ go get

## 编译和安装某个pkg
$ go install

## 编译某个项目
$ go build
```

推荐使用开发工具：`sublime text 2`（P's 若安装后无法代码自动提示，可以考虑升级go版本。）

+ [Sublime Text 2搭建Go开发环境（Windows）](http://www.cnblogs.com/sevenyuan/archive/2013/03/01/2938351.html){:target="_blank"}
