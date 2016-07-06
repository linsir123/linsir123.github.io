---
layout: post
title:  "[AS3] PureMvc学习"
categories: [other]
---

pureMVC的几个核心模块（Singleton）

* facade => 外观模式，也就是App通过这个类与框架进行交互（类似lxsPHP中的APP类）
* model => 用于维护和管理proxy对象
* view => 用于维护和管理mediator和observer对象
* controller => 用于维护和管理command对象


-----------------------------------

为了使用各模块之间在较低耦合的情况通信引入以下模块

* observer
* notification


-----------------------------------


为了项目的水平扩展引入以下几个MVC的对应模块

* proxy

```
用于维护应用的各项业务数据，在使用上可以根据场景进行松耦结合的方式；
【耦】当业务较为单一时，可以直接被mediator进行引用和方法调用；
【松】当业务关联较多时，为了使数据变更时可以通知到所有相关的mediator进行变更，需要发送某项通知并在mediator监听对应的通知和处理通知；
```

* mediator

```
一个mediator对象映射一个ui对象，并处理ui对象添加和移除
一个ui对象（sprite）内可维护一个movieClip对象用于放置其它ui组件
ui对象内部的各交互产生的事件可由flash.event进行派发，并交由mediator与框架的其它模块通信
mediator定义监听事件（listNotificationInterests）并进行事件处理（handleNotification）
```

* command

```
用于注册和调度proxy和mediator
```


-----------------------------------


参考

+ [PureMVC（AS3）剖析](http://www.cnblogs.com/skynet/archive/2012/12/29/2838303.html){:target="_blank"}
