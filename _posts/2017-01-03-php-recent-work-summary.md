---
layout: post
title:  "[PHP] 后端开发周期事项总结"
categories: [php]
---

### API
---------------------

+ 逻辑构建
    
    * 接口输入输出数据结构清晰明了（方便维护查看）；
    * 方法或者函数的形参和实参尽量保持一至（PHP新版本特性利用）；
    * 逻辑避免过度封装，严格执行各层级定义（多看，总结经验，复用）；
    * 多版本各存如何共存维护，以及迭代后回收垃圾代码；

+ 性能问题

    * 抓包分析；
    * IO以及空间开销；
    * 数据库慢查询（join[n], 索引[y]）；
    * http,redis,mysql，连接数以及其它数据指标；
    * mysql性能优化，以及缓存和持久存储易用和高可用特性（mysql,redis间的信息互用）；

+ 安全问题

    * xss, sql
    * webshell，肉鸡？

+ 项目开发
    
    * Git工作流和协作；
    * 自动构建（接口和文档映射）；
    * 时间管理（开发、优化、测试）；
    * 团队沟通（有效、情绪）；


### 平台类项目
---------------------

+ 统计数据
    
    * 数据场景数据“实时”，“精度”分析和方案选择；
    * 前端报表和数据表的一至性？数据慢查询；

+ 前端模板

    * 管理后台模板化，组件化；


### 通用系统构造
---------------------

+ 邮件系统；
+ 异步队列系统；
+ 服务器资源管理；
+ 联机方案；
