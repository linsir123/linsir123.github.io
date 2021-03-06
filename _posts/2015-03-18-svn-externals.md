---
layout: post
title:  "[SVN] 外部引用特性实战"
categories: [git]
---

### 前置
--------------

在SVN中有一个属性叫`svn:externals（外部引用）`，使用这个特性可以用于管理类似`框架代码`和`配置代码`


### 配置管理
--------------

工作涉及的平台目前拥有大大小小的项目有十来个，涵盖API、Crontab、Nohup和Web。
在配合运维同事进行维护时经常会碰到一个场景：某台服务器由于故障需要进行下架替换操作（由于客观原因，一台服务器可能有多项服务）。

这个时候通常开发人员会去把所有的项目都搜索一次确认下哪些项目有使用到故障服务器。采用此方法虽然也可以达到目的，但整体略显暴力。
为了优化上述方法，使用SVN的外部引用的特性可以达到相同效果，对比上述方法使用此方法有以下两点好处：

* 配置文件统一放置至某个目录进行管理；
* 配置文件可以从源代码位置得到同步更新；


### 框架管理
--------------

经常我们在开发中会使用各种框架（或是代码片段），有可能出现多个项目使用了同一个框架的场景。
在这种场景下若是框架变更了，要把这个更新推送到每个项目中，就需要逐个项目更新发布一遍。

若我们在构造项目时，针对框架的引入采用外部引用的方式，就可以规避掉上面说的问题。
只需要把框架的代码更新后发布，就可以所有项目都生效了（前提在每台服务器上都有部署框架，若没有需要每个项目进行发布，但至少代码的一至性得到保证）。


### 参考
--------------

+ [使用 Tortoise SVN 创建 Externals 外部引用目录](http://blog.sina.com.cn/s/blog_6204ca300101itg2.html){:target="_blank"}
