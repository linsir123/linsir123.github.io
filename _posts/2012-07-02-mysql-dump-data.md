---
layout: post
title:  "[Mysql] 数据导出"
categories: [mysql]
---

### mysqldump
-----------------------------------------

其中用户名为root，密码为dbpasswd，数据库名为dbname，导出文件为db.sql： 

```shell
# 导出数据库为dbname的表结构
$ mysqldump -uroot -pdbpasswd -d dbname > /tmp/db.sql

# 导出数据库为dbname某张表(test)结构
$ mysqldump -uroot -pdbpasswd -d dbname test > /tmp/db.sql

# 导出数据库为dbname所有表结构及表数据（不加-d）
$ mysqldump -uroot -pdbpasswd dbname > /tmp/db.sql

# 导出数据库为dbname某张表(test)结构及表数据（不加-d）
$ mysqldump -uroot -pdbpasswd dbname test > /tmp/db.sql

# 根据查询条件进行导出（limit可以直接写在“条件子句”内）
$ mysqldump -uroot -pdbpasswd -w "gameid=100015389 limit 0,10000" dbname test > /tmp/db.sql

# 数据导入时只需要
$ mysql> source /tmp/db.sql   
```


### mysql
-----------------------------------------

导出数据列表，如csv（数据格式可以通过sed进行过滤）

```shell
$ mysql -h192.168.1.1 -uroot -pdbpasswd -Ddbname -e"select games.game_id from relation join games on relation.game_id=games.id where term_id=10003" > ~/tmp.log

$ mysql -h192.168.1.1 -uroot -pdbpasswd -Ddbname -e"SET NAMES utf8;SELECT DISTINCT cngame FROM game_log AS a JOIN dev_game_bak as b ON a.gameid=b.id  WHERE time>='2015-01-01' AND time<'2016-01-01' LIMIT 5054" | sed 's/\t/,/g;s/\n//g'> ~/submit_2015.csv
```
