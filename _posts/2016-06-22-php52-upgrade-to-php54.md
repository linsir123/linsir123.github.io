---
layout: post
title:  "[PHP] 5.2.X升级至5.4.X性能对比"
categories: [php]
---

分别对PHP5.2.X和5.4.X版本的几个常用语句和流程进行压力测试，在同一服务器上得到的运行结果

```
--------------------------------------
|        PHP BENCHMARK SCRIPT        |
--------------------------------------
Start : 2014-08-21 14:52:39
PHP version : 5.2.17
Platform : Linux
--------------------------------------
test_Math                 : 2.019 sec.
test_StringManipulation   : 2.397 sec.
test_Loops                : 2.896 sec.
test_IfElse               : 2.947 sec.
test_Class                : 4.758 sec.
--------------------------------------
Total time:               : 15.017 sec.

--------------------------------------
|        PHP BENCHMARK SCRIPT        |
--------------------------------------
Start : 2014-08-21 14:52:25
PHP version : 5.4.19
Platform : Linux
--------------------------------------
test_Math                 : 1.971 sec.
test_StringManipulation   : 2.169 sec.
test_Loops                : 1.116 sec.
test_IfElse               : 1.136 sec.
test_Class                : 1.590 sec.
--------------------------------------
Total time:               : 7.982 sec.
```

从上述运行数据基本上可以得到5.4.X版本的运行速度为5.2.X的两倍。

以下再列举几张线上环境的运行结果图，分别从流量和负载上进行对比
（在同一时段流量基本一至的情况下，升级到5.4.X版本后的负载基本在1以内，而5.2.X而接近100）。

![apache-io](/public/images/apache-io.png)

![apache-traffic](/public/images/apache-traffic.png)

另外Apache版本的升级对http进程对cpu的占用也有不少的提升。

以下附上PHP的性能测试脚本

[bench-class.php](/public/php/bench-class.php){:target="_blank"}
