---
layout: post
title:  "[Linux] vim - 批量注释"
categories: [linux]
---

在linux编辑文件时经常要要用到批量注释，以下使用方法：

```
+ 在开始行按住ctrl+v进入多行编辑模式
+ 跳到结束行，可以使用G，或上下移动光标
+ 然后按shift+i，进入编辑模式，输入注释符
+ 按esc退出编辑模式
```

反过来删除注释也是一样，只到注释符按下“d”这样就可以了。
