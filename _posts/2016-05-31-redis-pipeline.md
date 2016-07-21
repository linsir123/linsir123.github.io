---
layout: post
title:  "[Redis] Pipeline合并读写"
categories: [default]
---

### 瓶颈
--------------------

据运维同事关于Redis服务的运维经验来看，Redis在以下的几种情况下将会达到瓶颈：
connect到达3k，command到达15k（这里漏掉了具体的服务器配置信息...），常用的优化解决方案：

```
* 在应用层，常用的优化方案比如分流（根据IP或UID进行散列，或选择其它的分布式方案`codis`）
* 在器硬件层，由于Redis是单线程架构，在CPU上面尽量都选择主频稍微高点的服务器来搭建
```


### 合并读写
--------------------

这里展开另一个话题“如何优化单次请求中大量读写命令导致的请求执行时间过长的问题”（类似mysql中的合并读写）。
若一个请求中有大量的command，利用Pipeline进行合并读写将可以有效的降低请求的执行时间
（关于command相互间有依赖的请求没有验证过是否可行）。

```php
<?php
/// 提交redis请求
$pipe = $redis->multi(Redis::PIPELINE);
for ($i = $min; $i <= $max; $i = $i + $step) {
	$key = sprintf("key_%s", $i);
	$pipe->hGetAll($key);
}
$pipeReply = $pipe->exec();

/// 根据redis pipe返回值组装函数返回值
if (! empty($pipeReply)) {
	$index = 0;
	for ($i = $min; $i <= $max; $i = $i + $step) {
		$rData = $pipeReply[$index];
		if (! $rData)
			$rData = array();

		$list[$i] = $rData;
	}
}
```
