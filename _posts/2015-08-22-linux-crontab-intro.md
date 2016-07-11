---
layout: post
title:  "[Linux] crontab - 定时任务"
categories: [linux]
---

* 查看所有人的cron

在`/var/spool/cron`目录中可以查看有配置定时任务的各个帐号。


* 各字段定义

在`/etc/crontab`中有注释各字段的语义。

```
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
```

* 基本格式 

```
*　　*　　*　　*　　*　　command
分　 时　 日　 月　 周　 命令

第1列表示分钟1～59 每分钟用*或者 */1表示
第2列表示小时1～23（0表示0点）
第3列表示日期1～31
第4列表示月份1～12
第5列标识号星期0～6（0表示星期天）
第6列要运行的命令
```

* 常见例子

```bash
$ 30 21 * * * /usr/local/etc/rc.d/lighttpd restart
# 上面的例子表示每晚的21:30重启apache。

$ 45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart
# 上面的例子表示每月1、10、22日的4 : 45重启apache。

$ 10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart
# 上面的例子表示每周六、周日的1 : 10重启apache。

$ 0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart
# 上面的例子表示在每天18 : 00至23 : 00之间每隔30分钟重启apache。

$ 0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart
# 上面的例子表示每星期六的11 : 00 pm重启apache。

$ * */1 * * * /usr/local/etc/rc.d/lighttpd restart
# 每一小时重启apache

$ * 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart
# 晚上11点到早上7点之间，每隔一小时重启apache

$ 0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart
# 每月的4号与每周一到周三的11点重启apache

$ 0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart
# 一月一号的4点重启apache
```

* 参考

+ [http://blog.csdn.net/ethanzhao/article/details/4406017](http://blog.csdn.net/ethanzhao/article/details/4406017){:target="_blank"}
