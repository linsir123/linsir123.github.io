---
layout: post
title:  "[Linux] find - 文件搜索"
categories: [linux]
---

在某个目录中搜索包含某个关键字的文件列表

```
$ find . -type f -name "*.php" | xargs egrep 'keyword'
```

涉及命令：find, xargs, egrep
