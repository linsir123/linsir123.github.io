---
layout: post
title:  "[Storm] Pyleus注意事项"
categories: [storm]
---

### 引用python扩展包
-------------------------------

pyleus实际上是运行了一个虚拟的运行环境，所以如果应用内有包含一些第三方包的话，则需要添加到`requirements.txt`中，否则会出现编译出错提示找不到相应的模块。
而项目名称是对应使用pip安装时的名称。如：使用到这个包`http://axiak.github.io/pybloomfiltermmap/index.html#install`，则写到"requirements.txt"的项目名应该是`pybloomfiltermmap`而不是模块名`pybloomfilter`


### 常用命令
-------------------------------

```
## 列出服务中运用的任务列表
$ pyleus list -n 192.168.1.70 

## 打包并显示过程信息
$ pyleus -v build pyleus_topology.yaml 

## 提交任务
$ pyleus --verbose submit -n 192.168.1.70 demo.jar

## 删除任务
$ pyleus kill -n 192.168.1.70 demo

## kafka消息订阅（用于查看队列里的消息）
/usr/local/kafka_2.8.0-0.8.0/bin/kafka-console-consumer.sh --zookeeper 192.168.1.70:2182,192.168.1.73:2182,192.168.1.189:2182 --topic demo
```
