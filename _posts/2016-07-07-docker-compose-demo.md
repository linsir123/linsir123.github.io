---
layout: post
title:  "[Docker] 利用Compose运行集成容器"
categories: [default]
---

### 前置
-----------------------------

在项目（如：nginx+php+mysql+redis...）中可以用`Compose`创建并关联和运行多个容器。
在操作过程中只需要通过`docker-compose.yml`进行容器配置，然后运行`$ docker-compose up`命令就可以创建和运行多个容器。


### 安装
-----------------------------

在Windows下通过Docker Toolbox安装的话，有集成了Compose工具。在linux下如果没有安装的话，可以试用以下进行安装。

```
$ curl -L https://github.com/docker/compose/releases/download/1.6.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
$ docker-compose version
docker-compose version 1.6.2, build 4d72027
docker-py version: 1.7.2
CPython version: 2.7.9
OpenSSL version: OpenSSL 1.0.1e 11 Feb 2013
```


### 案例
-----------------------------

在官网上有提供了很套案例，这里贴一段如果搭建一个Wordpress的过程

```
$ mkdir my_wordpress
$ cd my-wordpress/
$ vi docker-compose.yml
$ cat docker-compose.yml
version: '2'
services:
  db:
    image: mysql:5.7
    volumes:
      - "./.data/db:/var/lib/mysql"
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    links:
      - db
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_PASSWORD: wordpress

$ docker-compose up -d

### 常用配置项
### image   镜像名称
### build   直接从pwd的Dockerfile来build，而非通过image选项来pull（这里没有使用到）
### volumes 将本地目录和容器内目录做关联（防止生产数据在容器内因为关闭而丢失）
### links   连接到那些容器，每个占一行。
```

访问http://192.168.99.100:8000，即可以访问到上述部署好的Wordpress环境。


### 参考
-----------------------------

* [使用Docker快速部署Storm环境](http://www.tnidea.com/deploy-storm-by-docker.html){:target="_blank"}
* [Docker Compose—简化复杂应用的利器](http://debugo.com/docker-compose){:target="_blank"}
* [Quickstart: Docker Compose and WordPress](https://docs.docker.com/compose/wordpress/){:target="_blank"}
* [Compose file reference](https://docs.docker.com/compose/compose-file){:target="_blank"}
