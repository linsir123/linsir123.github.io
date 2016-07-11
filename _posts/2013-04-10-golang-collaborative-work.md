---
layout: post
title:  "[Golang] 协同开发环境构造"
categories: [golang]
---

在项目开发中经常需要协同开发的工作。
而由于每个人的本地开发环境配置的差异化，有可能在包引用上使用了绝对路径，而致其它项目内的协作人员无法正确编译。
所以在涉及协同的时候，对项目的路径最好有所规范。

```
项目的第三方引用包或自研的框架统一部署在某目录下如
/go/lib/framework
/go/lib/github.com/xxx
/go/lib/github.com/yyy
```

```
而每个成员的开发目录如
/home/A/go
/home/B/go
```

```
最后需要每个成员把上述的各目录配置到GOPATH中

$ vim ~/.bash_profile

PATH=$PATH:$HOME/bin
GOPATH=$GOPATH:/go/lib:/home/A/go
```


```golang
// framework/redis/redis.go

/**
 * 这样在引用第三方项目的时候就只需要写入相对路径
 */
package LgRedis

import (
	"github.com/fzzbt/radix/redis"
	"strconv"
)

...
```

```golang
// archiveDistributed/main.go

/**
 * 在项目内引用其它模块和框架
 */
package pools

import (
	"archiveDistributed/subServer/config"
	"framework/redis"
)

...
```
