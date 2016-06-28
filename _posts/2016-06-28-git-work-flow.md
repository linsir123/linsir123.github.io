---
layout: post
title:  "[Git] 工作流"
categories: [git]
---

Git中的分支不像SVN里是一个完整的项目Copy，而只是创建一个指针。所以在Git中创建一个分支的成本很低，可以很任性的创建和删除。
如何在项目中有效的将各开发版本、修复版本、测试版本、预发布版本等多条版本线合理的管理，就需要引入`工作流`这个概念。
常见的Git工作流有（具体百度）：

* 中心化的工作流
* 基于功能分支的工作流
* Gitflow工作流
* Fork工作流

关于Git的客户端，可以选择`Git`或`SourceTree`。
其中在SourceTree中有自带了Gitflow的工作流集成，可以通过工具减少在流程和命令不熟练的情况下，快速接入使用。

```
通过SourceTree创建一个项目，并使用Gitflow进行仓库初始化
```

![git-flow](/public/images/git-flow.png)

-------------------------------------------------

参考

* [分支模型](http://nvie.com/posts/a-successful-git-branching-model/){:target="_blank"}
* [团队协作](http://www.360doc.com/content/14/0508/17/14416931_375851686.shtml){:target="_blank"}
* [四种常见 Git 工作流比较](http://www.cnblogs.com/itech/p/5188929.html){:target="_blank"}
