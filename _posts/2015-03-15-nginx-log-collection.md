---
layout: post
title:  "[Nginx] 日志采集请求无效"
categories: [nginx]
---

在统计项目（比较典型的流量统计）中，对源数据的采集实现通常为（暂时不讨论分布式架构，涉及日志同步问题）：
部署nginx服务器，并配置某路由（http://xxx/log/trace.js?...）产生对应的访问日志`access_log`，然后客户端通过访问对应的路由进行提交日志。

---------------------------

线上的生产环境有出现过以下问题：浏览器发出请求，但nginx却没有记录到日志。
经排查发现可以有以下问题导致请求没有到达服务端。

* 静态文件被浏览器缓存住了; 
* 请求被运营商劫持（类似联通的404页面）；

---------------------------

解决缓存问题可以采用：

* 通过在服务器上添加过期机制；
* 访问静态文件添加随机值；
* 参考
	+ [浏览器缓存机制](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html){:target="_blank"}