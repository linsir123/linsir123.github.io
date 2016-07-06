---
layout: post
title:  "[Storm] flume+kafka+storm(pyleus)集成测试"
categories: [storm]
---

### 概要说明
--------------------------

![storm-cluster](/public/images/storm-stream.jpeg)

1. 数据采集

	负责从各节点上实时采集数据，选用cloudera的`flume`来实现

1. 数据接入

	由于采集数据的速度和数据处理的速度不一定同步，因此添加一个消息中间件来作为缓冲，选用apache的`kafka`

1. 流式计算

	对采集到的数据进行实时分析，选用apache的`storm`

1. 数据输出

	对分析后的结果持久化，暂定用`mysql`


### 服务器配置
--------------------------

#### `flume`

```
#agent section
producer.sources = s
producer.channels = c
producer.sinks = r

#source section
producer.sources.s.type = exec
producer.sources.s.command = tail -f -n+1 /var/log/messages
producer.sources.s.channels = c

# Each sink's type must be defined
producer.sinks.r.type = org.apache.flume.plugins.KafkaSink
producer.sinks.r.metadata.broker.list=127.0.0.1:9092
producer.sinks.r.partition.key=0
producer.sinks.r.partitioner.class=org.apache.flume.plugins.SinglePartition
producer.sinks.r.serializer.class=kafka.serializer.StringEncoder
producer.sinks.r.request.required.acks=0
producer.sinks.r.max.message.size=1000000
producer.sinks.r.producer.type=sync
producer.sinks.r.custom.encoding=UTF-8
producer.sinks.r.custom.topic.name=test
```

```
## 启动命令
$ bin/flume-ng agent --conf conf --conf-file conf/flume-conf.properties --name producer -Dflume.root.logger=INFO,console
```

#### `kafka`

```
启动命令：
$ bin/zookeeper-server-start.sh config/zookeeper.properties
$ bin/kafka-server-start.sh config/server.properties

监听命令：
$ bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning

生产命令：
$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

#### `pyleus`

pyleus_topology.yaml（官方example里有一个word_count的案例，将其中的spout调整为kafka源）

```
name: word_count
topology:
    - spout:
        name: line-spout
        type: kafka
        options:
            topic: test
            zk_hosts: 127.0.0.1:2181
            zk_root: /pyleus-kafka-offsets/word_count
            consumer_id: pyleus-word_count
            from_start: false
    - bolt:
        name: split-words
        module: word_count.split_words
        parallelism_hint: 3
        groupings:
            - shuffle_grouping: line-spout
```


### 参考
--------------------------

+ [【Twitter Storm系列】flume-ng+Kafka+Storm+HDFS 实时系统搭建 ](http://blog.csdn.net/weijonathan/article/details/18301321){:target="_blank"}
+ [Flume NG 简介及配置实战](http://blog.csdn.net/weijonathan/article/details/18301321){:target="_blank"}
