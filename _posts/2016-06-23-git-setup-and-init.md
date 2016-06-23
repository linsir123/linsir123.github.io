---
layout: post
title:  "[Git] 安装以及初始化"
categories: [git]
---


### 全局配置

Git客户端安装后，需要对客户端的用户信息做个全局配置

```
$ git config --global user.name "your name"
$ git config --global user.email "your email"
```

-----------------------

### SSH key配置

```
$ ssh-keygen -t rsa -C "your email"
```
则会在默认目录下（如： `C:\Users\xxx\.ssh` ）生成一对密钥：id_rsa为私钥，id_rsa.pub则为公钥；
需要将公钥内容复制到GitLib/Github的ssh配置项，这样就可以实现代码通过ssh方式进行提交。

-----------------------

### 提交时提示输入密码？

Git本地向GitLib/Github进行版本提交时可以通过`https`或`ssh`的方式。

P.s

在github.com上建立了一个小项目，可是在每次push的时候，都要输入用户名和密码。
原因是使用了https方式push
在termail里边输入：`git remote -v`
可以看到形如一下的返回结果

```
origin https://github.com/xxx/xxx.git (fetch)
origin https://github.com/xxx/xxx.git (push)
```

下面把它换成ssh方式的

```
git remote rm origin
git remote add origin git@github.com:xxx/xxx.git
git push origin
```

-----------------------

### 项目初始化

进入某个还没有入库到Git的本地项目目录，并调出Git Bash

```
$ git init
$ git add .
$ git commit -m "init"
```
这样就将本地的项目初始到本地的Git库中。

-----------------------

### 提交项目至GitLib/Github

```
$ git remote add origin git@xxx.git
$ git push -u origin master
// 在版本初始成功后，后续的版本提交只需要
$ git push origin master
```

-----------------------

### 参考

+ [http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000){:target="_blank"}
