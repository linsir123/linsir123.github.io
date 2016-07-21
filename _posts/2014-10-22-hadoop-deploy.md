---
layout: post
title:  "[Hadoop] 服务器部署"
categories: [staticstics]
---

### 主进程
---------------------------

`NameNode`是Hadoop中的主服务器，它管理文件系统名称空间和对集群中存储的文件的访问。
还有一个`SecondaryNameNode`，它不是NameNode的冗余守护进程，而是提供周期检查点和清理任务。
在每个Hadoop集群中可以找到一个NameNode和一个SecondaryNameNode。


### 数据进程
---------------------------

`DataNode`管理连接到节点的存储（一个集群中可以有多个节点）。每个存储数据的节点运行一个DataNode守护进程。


### 运算进程
---------------------------

最后，每个集群有一个`JobTracker`，它负责调度DataNode上的工作。
每个DataNode有一个`TaskTracker`，它们执行具体的数据分析统计工作。
JobTracker和TaskTracker采用主-从形式，JobTracker跨DataNode分发工作，
而TaskTracker执行任务。JobTracker还检查请求的工作，如果一个DataNode由于某种原因失败，JobTracker会重新调度以前的任务。


P's: JobTracker守护进程请求DataNode执行MapReduce作业。


### 检测
---------------------------

以上服务器节点可以通过以下检测是否正常开启。

```bash
#### 
$ jps 
13896 Jps 
1173 NameNode 
1489 SecondaryNameNode 
1736 TaskTracker 
1602 JobTracker 
1302 DataNode

#### 
$ hadoop dfsadmin -report
Configured Capacity: 849601273856 (791.25 GB) 
Present Capacity: 731334221824 (681.11 GB) 
DFS Remaining: 730953744384 (680.75 GB) 
DFS Used: 380477440 (362.85 MB) 
DFS Used%: 0.05% 
Under replicated blocks: 0 
Blocks with corrupt replicas: 0 
Missing blocks: 0 

------------------------------------------------- 
Datanodes available: 2 (2 total, 0 dead) 

Name: 192.168.1.187:50010 
Decommission Status : Normal 
Configured Capacity: 581120925696 (541.21 GB) 
DFS Used: 190119936 (181.31 MB) 
Non DFS Used: 34201894912 (31.85 GB) 
DFS Remaining: 546728910848(509.18 GB) 
DFS Used%: 0.03% 
DFS Remaining%: 94.08% 
Last contact: Tue Oct 28 10:16:59 CST 2014 


Name: 192.168.1.151:50010 
Decommission Status : Normal 
Configured Capacity: 268480348160 (250.04 GB) 
DFS Used: 190357504 (181.54 MB) 
Non DFS Used: 84065157120 (78.29 GB) 
DFS Remaining: 184224833536(171.57 GB) 
DFS Used%: 0.07% 
DFS Remaining%: 68.62% 
Last contact: Tue Oct 28 10:17:00 CST 2014
```

P's: 在`/etc/hosts`, `xxx/conf/slaves`中节点名称需要统计采用hostname


### 参考
---------------------------

* [Running Hadoop on Ubuntu Linux (Multi-Node Cluster)](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/){:target="_blank"}
* [Hadoop安装配置](http://www.cnblogs.com/xia520pi/archive/2012/05/16/2503949.html){:target="_blank"}
