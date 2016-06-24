---
layout: post
title:  "[Mysql] 查询某个库的空间占用情况"
categories: [mysql]
---

如果想知道MySQL数据库中每个表占用的空间、表记录的行数的话，可以打开MySQL的`information_schema`数据库。
在该库中有一个`TABLES`表，这个表主要字段分别是：

```
TABLE_SCHEMA : 数据库名
TABLE_NAME：表名
ENGINE：所使用的存储引擎
TABLES_ROWS：记录数
DATA_LENGTH：数据大小
INDEX_LENGTH：索引大小
```

```
mysql> use information_schema
mysql> SELECT TABLE_NAME AS `table`, concat(round(DATA_LENGTH/1024/1024, 2), 'MB') AS `data_size`, concat(round(INDEX_LENGTH/1024/1024, 2), 'MB') AS `index_size` FROM information_schema.TABLES where TABLE_SCHEMA='flashscore';
```

参考

+ [http://www.oschina.net/question/12_3673](http://www.oschina.net/question/12_3673){:target="_blank"}
