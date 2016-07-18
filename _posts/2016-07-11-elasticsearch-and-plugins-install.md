---
layout: post
title:  "[Elasticsearch] 安装和插件"
categories: [default]
---

### Elasticsearch
-----------------------------

```bash
$ wget https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/zip/elasticsearch/2.3.4/elasticsearch-2.3.4.zip
$ unzip elasticsearch-2.3.4.zip
$ mv elasticsearch-2.3.4 /usr/local/elasticsearch
$ cd /usr/local/elasticsearch/

## 启动。P's 因为安全问题elasticsearch不让用root用户直接运行
$ bin/elasticsearch -d

## 测试
$ curl -X GET http://localhost:9200/
{
  "name" : "Shriker",
  "cluster_name" : "elasticsearch",
  "version" : {
    "number" : "2.3.4",
    "build_hash" : "e455fd0c13dceca8dbbdbb1665d068ae55dabe3f",
    "build_timestamp" : "2016-06-30T11:24:31Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.0"
  },
  "tagline" : "You Know, for Search"
}
```


### Elasticsearch Head Plugin
-----------------------------

有点类似phpMyadmin之于mysql，是一个不错的es客户端。安装过程也比较简单如下：

```bash
$ cd /usr/local/elasticsearch/
$ bin/plugin install mobz/elasticsearch-head
```

访问`http://ip:9200/_plugin/head/`即可。


### IK Analysis Plugin
-----------------------------

是一个分词插件。Elasticsearch默认提供的分词器，会把每个汉字分开，而不是我们想要的根据关键词来分词。
访问以下两个链接可以查看到分词的对比。

`http://ip:9200/hello/_analyze?analyzer=standard&pretty=true&text=我是中国人`

`http://ip:9200/hello/_analyze?analyzer=ik&pretty=true&text=我是中国人`


### P's
-----------------------------

由于Elasticsearch需要使用到Java的环境，并且在ik编译时需要使用到Maven，以下简单帖上安装过程

```bash
$ wget http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.tar.gz
$ tar zxvf jdk-7u79-linux-x64.tar.gz
$ mv jdk1.7.0_79/ /usr/lib/jvm/
$ vi /etc/profile

## 添加配置信息到/etc/profile
export JAVA_HOME=/usr/lib/jvm
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

$ source /etc/profile
$ java -version
java version "1.7.0_79"
Java(TM) SE Runtime Environment (build 1.7.0_79-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.79-b02, mixed mode)
```

```bash
$ wget http://mirrors.hust.edu.cn/apache/maven/maven-3/3.2.5/binaries/apache-maven-3.2.5-bin.tar.gz
$ tar -zxvf apache-maven-3.2.5-bin.tar.gz
$ mv apache-maven-3.2.5 /usr/local/
$ vi /etc/profile

## 添加配置信息到/etc/profile
export MAVEN_HOME=/usr/local/apache-maven-3.2.5  
export PATH=${PATH}:${MAVEN_HOME}/bin

$ mvn -v
Apache Maven 3.2.5 (12a6b3acb947671f09b81f49094c53f426d8cea1; 2014-12-14T17:29:23+00:00)
Maven home: /usr/local/apache-maven-3.2.5
Java version: 1.7.0_79, vendor: Oracle Corporation
Java home: /usr/lib/jvm/jre
```


### 应用场景
-----------------------------

#### 存储服务

#### 搜索服务

* 索引初始化
* 增量索引
* 搜索接口

#### 统计分析服务(elk)

* 数据采集/加工
* 数据分析统计（聚合语句）

  - [[Elasticsearch] 聚合 - 时间数据处理(Looking at Time)](http://blog.csdn.net/dm_vincent/article/details/42594043){:target="_blank"}
  - [Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html){:target="_blank"}

* 绘制报表

  - [Kibana4](http://kibana.logstash.es/content/kibana/v4/){:target="_blank"}

```
在生产过程中可以使用es用于计量类型的数据统计（不适用于留存、新增等统计），并且只保留周期性的原始日志。

* 对于历史数据，可以通过es的聚合接口将统计数据周期性的落地到mysql，再由自己开发的管理后台进行数据报表展现；
* 使用kibana类似于实时监控对数据进行实时的报表展现；
```


### 参考
-----------------------------

* [五类Elasticsearch扩展性插件推荐](http://cloud.51cto.com/art/201505/476450.htm){:target="_blank"}
* [Elasticsearch安装中文分词插件ik](http://blog.csdn.net/liuzhenfeng/article/details/39404435){:target="_blank"}
* [[Elasticsearch] Elasticsearch权威指南翻译目录](http://blog.csdn.net/dm_vincent/article/details/46994535){:target="_blank"}
* [elasticsearch中的API](http://www.cnblogs.com/yjf512/p/4862992.html){:target="_blank"}
