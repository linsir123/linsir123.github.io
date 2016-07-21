---
layout: post
title:  "[Elasticsearch] Kibana统计分析搜索"
categories: [staticstics]
---

### 方案
-----------------------------

es做为计量统计常见方案

1. 通过Kibana提供的丰富报表功能进行各种业务需求的报表绘制；
2. 通过搜索聚合接口将统计数据定期从es中统计到mysql中，再自己开发一套业务报表后台；

```
方案各具利弊

方案1，优点是Kibana强大的报表集成功能；缺点是Kibana偏向于一个运维工具对于业务人员在使用成本上会相对高一些，另外就是不具有权限细化功能；

方案2，优点是可以根据业务需求定制数据并划分好报表权限；缺点是需要自己设计统计数据表并编写cron定时拉取统计数据，以及处理前端的业务报表绘制；
```


### 案例
-----------------------------

这里以流量统计场景做为案例，说明下在Kibana中如何进行统计报表展现

1. 数据在es的索引，以每天一个日志一个索引进行构建（如：flow-staticstics-2016.07.20）；
1. 通过Settings配置一个索引模式（如：flow-staticstics-*）；

1. 通过Visualize创建一个Line chart，选择好使用的索引模式；
1. 使用Add metrics配置Y轴，常用的聚合方式有Count、Unique Count分别用于计量、去重计量；
1. 使用Add buckets配置X轴，常用的聚合方式有Fitlers、Terms、Date Histogram；
1. 将图表保存，再可以添加到工作台Dashboard（时间范围的选择可以在这里进行）。

这样简单的操作就可以得到一张X轴为某个单位时间内的PV和UV统计报表了。

```
Count count 聚合返回选中索引模式中元素的原始计数。
Unique Count cardinality 聚合返回一个字段的去重数据值。从下拉菜单选择一个字段。

Date Histogram date histogram 基于数值字段创建，由时间组织起来。你可以指定时间片的间隔，单位包括秒，分，小时，天，星期，月，年。
Terms terms 聚合允许你指定展示一个字段的首尾几个元素，排序方式可以是计数或者其他自定义的metric。
Filters 你可以为数据指定一组 filters。你可以用 query string，也可以用 JSON 格式来指定过滤器，就像在 Discover 页的搜索栏里一样。点击 Add Filter 添加下一个过滤器。


P's
在使用Unique Count进行去重计量时，当数据量比较小的时候有可能统计数据不准。
可以使用精度配置(precision_threshold，配置数值越大精度越高，最大为40000)进行优化处理。


若需要将统计结果保存到mysql，则可以将Visualize对应的request保存下来，写个cron定期请求
GET index/type/_search
{
	...
}
```

以下帖一张Visualize的配置图

![kibana](/public/images/kibana.png)

### 参考
-----------------------------

* [Cardinality Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html#_precision_control){:target="_blank"}
* [Lines Charts](http://kibana.logstash.es/content/kibana/v4/visualize/lines.html){:target="_blank"}
