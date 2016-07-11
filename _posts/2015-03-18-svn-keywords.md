---
layout: post
title:  "[SVN] 自动添加keywords"
categories: [git]
---

经常看一些开源项目的每个文都有一个很统一的注释头，并且会有一行文件的版本信息。
使用SVN管理的项目，可以自动加入版本信息。
目前支持5个关键字：Date（修改时间）、Revision（版本）、Author（提交者）、HeadURL（库路径）、Id（前面4个的组合）

在项目的SVN属性中，配置`auto-props`添加`*.php = svn:keywords=Id`，
这样在新建php文件后并添加下面这个头，在代码提交后`$Id$`这个关键字将被替换成SVN的版本信息。

```php
<?php
/**
 * 这里写的是文件的说明
 *
 * @version $Id$
 */
```
