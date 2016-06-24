---
layout: post
title:  "[Mysql] Replace into与Insert into on duplicate key update"
categories: [mysql]
---


在Mysql中对于存在`unique key`的数据记录，进行写入更新可以采用两个语句。

```
replace into
insert .. on deplicate udpate
```

----------------------

差异化

* key数据不存在的时候，replace into与insert .. on deplicate udpate表现相同，可以正常的将数据插入。
* key数据存在的时候，replace into会使表的auto_increment会自动+1（replace into语句，自增ID会被重写；等同于将旧数据删除后，再写入新数据。）。

```
insert .. on deplicate udpate保留了所有字段的旧值，再覆盖然后一起insert进去，而replace into没有保留旧值，直接删除再insert新值。
```
