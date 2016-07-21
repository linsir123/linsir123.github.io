---
layout: post
title:  "[Hadoop] 入门概念"
categories: [staticstics]
---

### Hadoop是什么？
---------------------------

一套用于分析大数据的分布式方案由分布式存储`Hdfs`和并行运算框架`MarReduce`这两个核心构成。


### Hadoop可以做什么？ 
---------------------------

可用于大数据进行简单的离线批处理。（待补充....）

### 关键字（服务器节点）？
---------------------------

```
5902 Jps
4950 RunJar
1173 NameNode
1489 SecondaryNameNode
1736 TaskTracker
1602 JobTracker
1302 DataNode
```


### 原生实现
---------------------------

先了解原生做法，通过Java来实现的MR并推送至Hadoop群集。
由于对JVM的机制还不是很了解，Hadoop有提供扩展支持可以借由其它脚本语言来实现MR，这将对于我们了解和尝试Hadoop有很大的帮助。
以下为一个使用Python实现的MR并进行数据分析的方案，另一个则为Hadoop伪分布式架构的搭建过程，通过这两篇文章将对我们了解Hadoop有很大的帮助。

+ [http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/](http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/){:target="_blank"}
+ [http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/){:target="_blank"}


### Pig / Hive
---------------------------

在通过上面的了解后，接着了解Hadoop的另一个方案`Pig`（或者`Hive`）。
暂时通俗的将Pig理解为一套基于Hadoop的数据分析脚本，或者可以理解为基于Hadoop的Mysql接口。
通过他我们可以快速的创建分析过程，免去了在MR上的编程过程，将大大的提升开发效率。
参考：

+ [http://pig.apache.org/docs/r0.12.1/start.html#run](http://pig.apache.org/docs/r0.12.1/start.html#run){:target="_blank"}
+ [http://www.codelast.com/?p=3621](http://www.codelast.com/?p=3621){:target="_blank"}
+ [http://www.distream.org/?p=385](http://www.distream.org/?p=385){:target="_blank"}


### 延伸
---------------------------

流量统计方案若采用Hadoop + Pig进行分析的话，过程大概是每日将当天的Web日志迁移到Hdfs进行存储（如何分布存储暂可后续再了解）
采用Pig编写类SQL的语句对无效数据进行过滤再此基础上再进行按游戏的分组统计，并将结果写到Hdfs再通过其它手段同步到Mysql以供系统使用。
