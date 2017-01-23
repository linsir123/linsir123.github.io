---
layout: post
title:  "[PHP] 整形Int32位溢出"
categories: [php]
---

### 背景
-----------------------------

最近对接的某平台项目对外提供的用户ID出现了整形溢出问题。

该平台的用户ID字段设计为int（平台内部存储结构采用int unsigned），但对外并未声明为unsigned或long或32?64。
而做为平台的用户使用方，由于疏忽并没有追究具体数据类型，致使在数据表设计时采用为默认的int类型（-2^31 ~ 2^31 – 1）。
也就是当平台方的用户ID超过2,147,483,647后，按我们的设计数据表的`user_id`字段将出现溢出的情况。

```sql
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '玩家ID',
```

为了解决这个问题，只能将user_id调整为int(11) unsigned或big int或采用varchar。


### 延伸 - PHP
-----------------------------

在PHP中几下函数也有可能出现整形溢出的使用场景

`intval` 返回值，最大值取决于操作系统为32或64位。

```
Return Values

The integer value of var on success, or 0 on failure. Empty arrays return 0, non-empty arrays return 1.

The maximum value depends on the system. 32 bit systems have a maximum signed integer range of -2147483648 to 2147483647. So for example on such a system, intval('1000000000000') will return 2147483647. The maximum signed integer value for 64 bit systems is 9223372036854775807.
```

`ip2long` 返回一个长整理，需要使用sprintf("%u", ip2long($ip))进行格式化。

```
Note:
Because PHP's integer type is signed, and many IP addresses will result in negative integers on 32-bit architectures, you need to use the "%u" formatter of sprintf() or printf() to get the string representation of the unsigned IP address.
```

```php
<?php
$ip = "192.0.34.166";
echo ip2long($ip), "\n"; 			// 32bit -1073732954 | 64bit 3221234342
echo sprintf("%u", ip2long($ip)), "\n";		// 3221234342
```
