---
layout: post
title:  "[Jekyll] 在Github上搭建自己的静态网站"
categories: [jekyll]
---

一直想挂个网站用于整理和沉淀在工作中的项目经验或日常的学习笔记，也试过很多的方法

* 自己在godaddy上买个主站域名，搭建一个wordpress站；
* 使用类似开源中国、csdn等提供的博客系统；
* 使用类似印象笔记、有道、为知等笔记工具；

---------------------

经过上面几个阶段的过程后，总结出几点需求

* 支持markdown，并且可以直接转换成html；
* 支持本地管理和编辑；

---------------------

在经过反复的使用和网上查找，发现Github pages就可以满足我上述的几需求。

* 在[https://pages.github.com/](https://pages.github.com/){:target="_blank"} 上创建一个站点
* 使用[Jekyll](http://jekyllcn.com/docs/quickstart/){:target="_blank"} 进行站点的管理和维护

```
Jekyll可以把他理解成一套Github pages支持的模板引擎，我们依照Jekyll的规范将站点的源码提交至Github，就可以在Github上托管生成一个站点
```

* 在[http://jekyllthemes.org/](http://jekyllthemes.org/){:target="_blank"}，可以找到很多开源的模板，可以找一个适合自己的站并把他clone到自己的Github pages站上，
然后将自己的整理的文档按格式（`年-月-日-标题.md`，如`2012-09-12-how-to-write-a-blog.md`）命名并放置到`_posts`文件夹中，提交至Github即可。其它的模板修改就是Jekyll的语法和html/js/css等方面的工作了。

---------------------

参考

+ [http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html){:target="_blank"}
