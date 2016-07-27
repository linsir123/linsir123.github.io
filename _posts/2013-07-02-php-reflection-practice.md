---
layout: post
title:  "[PHP] Reflection反射应用实践"
categories: [php]
---

### 简介
-----------------

PHP5具有完整的反射API，添加了对类、接口、函数、方法和扩展进行反向工程的能力。 
此外，反射API提供了方法来取出函数、类和方法中的`文档注释`（此处的场景和案例将基于这个点展开）。


### 场景
-----------------

在进行PHP项目开发时，代码使用phpDocumentor进行注释。
有以下几点好处：
1、可以集成IDE进行关联跳转（当项目文件较多，或者有嵌套的引用调用较有为用）；
2、使用phpDocumentor规范添加的注释具有较强的文档特性，直接体现在代码中可以做到一目了然。
3、通过php的反射机制提供的注释获取接口，可以将这些注释直接提取使用减少重复的文档编写。
生产实践中有应用到以下场景中：

* 接口客户端或文档
	
	对API接口实现的代码注释使用统一规范进行编写，再通过php的反射机制将各个接口分别生成对应的接口客户端或文档。

* 功能点权限维护

	在做管理类后台时，需要引入权限系统。常见的做法是在代码内的实现好各功能点，然后再将功能点录入权限系统里。
	若使用php的反射机制，则可以免去上述的步骤。可以定期扫描将功能点入库到权限系统里。

```php
<?php
/**
 * @name 这是放置模块说明
 * 
 * @version $Id$
 */
class MyTestApi
{
	/**
	 * @name 这是放置接口说明
	 * 
	 * @param  string $name 名称
	 * @param  string $msg  信息
	 */
	function sayHi($name, $msg)
	{
		echo  sprintf("%s say, %s", $name, $msg);
	}
}


/**
 * 
 */
class MyRefTester
{
	
	/**
	 * [run description]
	 * @param  [type] $className [description]
	 * @return [type]            [description]
	 */
	public function run($className)
	{
		$data = array();
		$refClass = new ReflectionClass($className);
		$classDocName = $this->getRefDocName($refClass);
		
		$data['class_doc'] = $classDocName;
		$data['methods'] = array();

		$methods = $refClass->getMethods(ReflectionMethod::IS_PUBLIC);
		foreach ($methods as $refMethod) {
			$name = $refMethod->getName();
			$docName = $this->getRefDocName($refMethod);
			$data['methods'][$name] = $docName;
		}

		///
		print_r($data);
	}

	/**
	 * [getRefDocName description]
	 * @param  [type] $ref [description]
	 * @return [type]      [description]
	 */
	public function getRefDocName($ref)
	{
		$tag = "@name";
		$doc = $ref->getDocComment();
		
		$matches = array();
		preg_match("/" . $tag . "(.*)(\\r\\n|\\r|\\n)/U", $doc, $matches);

		if (isset($matches[1])) {
			return trim($matches[1]);
		}

		///
		return '';
	}
}

///
$test = new MyRefTester();
$test->run("MyTestApi");
?>
```


### 参考
-----------------

+ [phpDocumentor](https://www.phpdoc.org/docs/latest/index.html){:target="_blank"}
+ [reflection](http://php.net/manual/zh/book.reflection.php){:target="_blank"}
