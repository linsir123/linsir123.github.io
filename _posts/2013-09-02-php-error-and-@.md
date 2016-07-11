---
layout: post
title:  "[PHP] 报错和“@”"
categories: [php]
---

### 以下几点关于报错和@的关系理解

* 在PHP中使用@加在某个语句前面，可以抑制错误在脚本的执行过程中输出到IO；

* 如果脚本启用`set_error_handler`语句进行错误重定向，则不管是否有使用@错误都会进入handler进入处理；

* 如果脚本启用`set_error_handler`并且不处理使用@的报错，
则可以通过`error_reporting`获取当前的报错级别对@进行过滤处理（添加了@后的error_reporting为0）

* 如果在某个语句上使用了@，则可以将语句内的各种嵌套的脚本可能存在的报错都会被抑制住；

```php
<?php
///
set_error_handler(array('my_error_handler'), E_ALL);

/**
 * 自定义错误处理
 * // 被“@”抑制后语句在出错的情况下不进入这方法
 *
 * @param int $errNum 错误代码
 * @param string $errStr 错误内容
 * @param string $errFile 错误文件
 * @param int $errLine 错误文件行号
 */
function my_error_handler($errNum, $errStr, $errFile, $errLine)
{
	///
	if (! (error_reporting() & $errNum)
		|| in_array($errNum, array(E_NOTICE, E_STRICT, E_USER_NOTICE))
	)
		return;

	///
	
}

```
