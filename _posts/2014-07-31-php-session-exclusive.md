---
layout: post
title:  "[PHP] Session独占"
categories: [php]
---

### 场景
-----------------

管理后台提供管理员一个文件下载功能（采用PHP将文件实时输出）。
某次管理员下载一个大文件（需要下载5分钟）时，发现后台其它链接在点击后无法响应，浏览器一直在转圈圈。
而下载一些小文件时（只需几秒就好），等文件下载完时则其它链接访问正常。
通过对比发现管理后台一旦在文件下载期间则其它链接都无法响应。


### 问题
-----------------

通过网上搜索得知Session在一次进程中对Session文件会处于独占访问，直到进程结束。
此说法正好跟场景里的情况表现一至，下载进程一直占用了Session文件（由于后台统计在入口有进行session_start操作），
致使其它进程无法正常访问Session文件而处于等待状态。
```


### 解决
-----------------

只需要将Session及时关闭就可以（也就是将所需的Session信息取出后及时关闭），通过调用`session_write_close`实现。


### P's
-----------------

Suhosin是一个PHP的保护工具，主要体现在cookie和session的加密保护等方面。
在跨子域（A:a.xxx.com; B:b.xxx.com）同服务器下共享session，会出现在每在一个子域下设置session后，在另一个子域下调用session后，发现session会被清空。
关闭Suhosin组件即可解决问题，网上查得说是Suhosin的一个Bug。

具体可以参考：

* [跨域、跨子域，跨服务器读取session](http://blog.csdn.net/jucrazy/article/details/7162247){:target="_blank"}
* [domain/subdomain problems with session cookies](https://bugs.php.net/bug.php?id=43682){:target="_blank"}
