---
layout: post
title:  "[Git] 安装以及初始化"
categories: [git]
---

+ Git客户端安装后，需要对客户端的用户信息做个全局配置
  ```
  $ git config --global user.name "山沟沟"
  $ git config --global user.email "linsir123@qq.com"
  ```

+ Git本地向GitLib/Github进行代码提交时需要配置SSH key
  ```
  $ ssh-keygen -t rsa -C "linsir123@qq.com"
  ```
  
  则会在默认目录下（如：`C:\Users\xxx\.ssh`）生成一对密钥：id_rsa为私钥，id_rsa.pub则为公钥，需要将公钥内容复制到GitLib/Github的ssh配置项，这样就可以实现代码通过ssh方式进行提交。

+ Git项目初始化
  进入某个还没有入库到Git的本地项目目录，并调出Git Bash
  ```
  $ git init
  $ git add .
  $ git commit -m "init"
  ```
  
  这样就将本地的项目初始到本地的Git库中。

+ Git本地库关联到GitLib/Github的版本库
  ```
  $ git remote add origin git@xxx.git
  $ git push -u origin master
  // 在版本初始成功后，后续的版本提交只需要
  $ git push origin master
  ```

+ 参考：
  - http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
  