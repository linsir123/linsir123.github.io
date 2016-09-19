---
layout: post
title:  "[Zookeeper] 简要说明(转)"
categories: [default]
---

### 是什么？
-----------------------------

简单的说，`zookeeper=文件系统+通知机制`。

+ 文件系统

	每个子目录项如 NameService 都被称作为 znode，
	和文件系统一样，我们能够自由的增加、删除znode，在一个znode下增加、删除子znode，唯一的不同在于znode是可以存储数据的。

```
有四种类型的znode：
1、PERSISTENT-持久化目录节点
客户端与zookeeper断开连接后，该节点依旧存在
2、 PERSISTENT_SEQUENTIAL-持久化顺序编号目录节点
客户端与zookeeper断开连接后，该节点依旧存在，只是Zookeeper给该节点名称进行顺序编号
3、EPHEMERAL-临时目录节点
客户端与zookeeper断开连接后，该节点被删除
4、EPHEMERAL_SEQUENTIAL-临时顺序编号目录节点
客户端与zookeeper断开连接后，该节点被删除，只是Zookeeper给该节点名称进行顺序编号
```

```
[linxs@host211 ~]$ zkCli.sh -server localhost:2181
Connecting to localhost:2181
....

[zk: localhost:2181(CONNECTED) 0] ls /
[controller_epoch, brokers, zookeeper, test, admin, isr_change_notification, consumers, config]
[zk: localhost:2181(CONNECTED) 1] help
ZooKeeper -server host:port cmd args
	stat path [watch]
	set path data [version]
	ls path [watch]
	delquota [-n|-b] path
	ls2 path [watch]
	setAcl path acl
	setquota -n|-b val path
	history 
	redo cmdno
	printwatches on|off
	delete path [version]
	sync path
	listquota path
	rmr path
	get path [watch]
	create [-s] [-e] path data acl
	addauth scheme auth
	quit 
	getAcl path
	close 
	connect host:port
```


+ 通知机制

	客户端注册监听它关心的目录节点，当目录节点发生变化（数据改变、被删除、子目录节点增加删除）时，zookeeper会通知客户端。


### 解决什么？
-----------------------------

+ 命名服务
+ 配置管理
+ 集群管理

	所谓集群管理无在乎两点：是否有机器退出和加入、选举master。
	
	对于第一点，所有机器约定在父目录GroupMembers下创建临时目录节点，然后监听父目录节点的子节点变化消息。一旦有机器挂掉，该机器与zookeeper的连接断开，其所创建的临时目录节点被删除，所有其他机器都收到通知：某个兄弟目录被删除，于是，所有人都知道：它上船了。新机器加入也是类似，所有机器收到通知：新兄弟目录加入，highcount又有了。
	
	对于第二点，我们稍微改变一下，所有机器创建临时顺序编号目录节点，每次选取编号最小的机器作为master就好。

```
以存档作弊检测方案（Golang）的架构来说，目前的架构

tail -F /logs/scribe/user.log | master |- <-- thrift --> sub1
                                       |- <-- thrift --> sub2
                                       |- <-- thrift --> subX

存在了几处问题
* 缺失队列系统用于缓冲日志（当日志的产生速度高于检测速度）
* master和sub缺少集群管理工具（当sub挂机重启后，master无法自动检测需要重启master）
* sub进程的配置缺少动态管理（如调整goroutine的数量，需要重新编译sub）

分别可以使用kafka和zookeeper解决上述两个问题。
```

+ 分布式锁
+ 队列管理


### 参考
-----------------------------

* [Zookeeper与paxos算法](http://ronghao.iteye.com/blog/1461798){:target="_blank"}
* [zookeeper命令行(zkCli.sh&zkServer.sh)使用及四字命令](http://blog.csdn.net/linux_bug/article/details/48728853){:target="_blank"}
* [kafka入门：简介、使用场景、设计原理、主要配置及集群搭建](http://www.aboutyun.com/thread-9341-1-1.html){:target="_blank"}
* [Apache Kafka：下一代分布式消息系统](http://www.infoq.com/cn/articles/apache-kafka){:target="_blank"}
