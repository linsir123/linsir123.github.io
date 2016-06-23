---
layout: post
title:  "[Pig] 站点PV和UV的大数据统计"
categories: [pig, hadoop]
---

通过Nginx采集流量统计相关日志，然后通过Bash工具将日志加工成Pig默认的格式（字段用tab分隔）并将日志导入到hdfs中，
然后通过Pig从hdfs中将数据导入并编写分析逻辑进行数据分析最后将结果保存至hdfs中，有必要则同步至Mysql。
其它用例如用户留存统计，进行留存统计时则将每日的用户分析后存储于hdfs以便隔天进行数据关联对比。

```pig
--
-- 此处的数据切割应当将由Bash处理，为了实验正则表达的使用所以这里采用这个方式
REGISTER '/usr/local/pig/contrib/piggybank/java/piggybank.jar'

--
A = LOAD 'xxx'
        USING org.apache.pig.piggybank.storage.MyRegExLoader(
                '(.*)###(.*)###xxx=(\\d+)&xxx=([^&]+).*###.*'
        ) AS (
                ip:chararray,
                time:chararray,
                game_id:int,
                token:chararray
        );

--
-- 计算PV
B = FOREACH (GROUP A BY game_id) GENERATE group,COUNT(A.ip) AS count;
C = ORDER B BY count ASC;
STORE C INTO 'pv.out';

--
-- 计算UV
B = GROUP A BY game_id;
C = FOREACH B {D = DISTINCT A.token; GENERATE group, COUNT(D) AS count;};
E = ORDER C BY count ASC;
STORE E INTO 'uv.out';
```
