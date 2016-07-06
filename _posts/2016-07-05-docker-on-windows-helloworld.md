---
layout: post
title:  "[Docker] 在Windows下安装测试PHP Hello world"
categories: [other]
---

首先在官网上查找相关在Windows下的使用方案和使用文档，发现了几个地方有分别介绍到Windows

* [Getting Started with Docker for Windows](https://docs.docker.com/docker-for-windows/){:target="_blank"}

	没有深入查看这个文档。

* [Installation on Windows](https://docs.docker.com/engine/installation/windows/){:target="_blank"}

	*Docker for Windows* 需要的环境为`64bit Windows 10 Pro, Enterprise and Education ...`，因为本机为Windows 7版本，所以暂时略掉采用外一种方案。

	*Docker Toolbox* 需有环境为`your machine must have a 64-bit operating system running Windows 7 or higher.`。主要包含了Docker Client, Machine（Oracle VM VirtualBox虚拟机）。
	

-----------------------------


安装过程：从官网下载一个安装包，然后一路下一步进行安装直到结束。
安装完毕后进入安装目录（如：D:\Program Files\Docker Toolbox），在该目录里打开git bash，并执行`start.sh`。
过程中大概执行了：创建一个提供了docker和ssh的linux虚拟机；以及虚拟机的网络环境初始化（分配IP地址192.168.99.100）；
并且在当前所在的git bash环境创建一个ssh连接到虚拟机，这样就可以在该环境中进行docker操作。
试运行`$ docker version`，可以输出以下内容则表示安装成功，若不成功则可以考虑卸载重新安装。

```
$ docker version
Client:
 Version:      1.11.2
 API version:  1.23
 Go version:   go1.5.4
 Git commit:   b9f10c9
 Built:        Wed Jun  1 21:20:08 2016
 OS/Arch:      windows/amd64

Server:
 Version:      1.11.2
 API version:  1.23
 Go version:   go1.5.4
 Git commit:   b9f10c9
 Built:        Wed Jun  1 21:20:08 2016
 OS/Arch:      linux/amd64
```

另外可以在安装过程结束后，自己启动虚拟机服务。然后通过Xshell等客户端连上该虚拟机，默认的用户名和密码是：docker/tcuser。
这个过程中Xshell在连接可能会提示“找不到匹配的outgoing encryption算法”，可以在“ssh > 安全设置”把所有的算法都勾选上。
这样就可以通过Xshell进行操作，在操作性会比上面的git bash来得实用。

-----------------------------


制作“PHP内置的Web Server”的镜像并运行

```
####
$ mkdir helloworld
$ cd helloworld


####
$ vi index.php
$ cat index.php
<?php
echo "Hi this is a test for PHP in Docker.\r\n";
?>


####
$ vi Dockerfile
$ cat Dockerfile
# 从官方PHP镜像构建
FROM       php

# 将index.php复制到容器内的/var/www目录下
ADD        index.php /var/www

# 对外暴露8080端口
EXPOSE     8080

# 设置容器默认工作目录为/var/www
WORKDIR    /var/www

# 容器运行后默认执行的指令
ENTRYPOINT ["php", "-S", "0.0.0.0:8080"]


####
$ docker build -t php-helloworld .


####
$ docker run -d -p 8080:8080 php-helloworld
```

上述过程通过Xshell实现。

在执行docker run语句时，一直为报错“docker: Error response from daemon: rpc error: code = 2 desc = "oci runtime error: not a directory".”
在网上查找到的问题原因为“应该是本地映射的目录在container中不存在导致的”。而后查看目录/var/www果真不存在，将其改为/tmp后再执行就可以。

```
docker@default:~/hello$ curl localhost:8080
Hi this is a test for PHP in Docker. 
docker@default:~/hello$ 
```

通过`$ docker ps`可以查看目前运行的容器。通过`$ docker kill`可以将指定容器关闭。

```
docker@default:~/hello$ ls
Dockerfile  index.php
docker@default:~/hello$ docker ps
CONTAINER ID        IMAGE               COMMAND                 CREATED             STATUS              PORTS                    NAMES
b66468250aa6        lxs/hello           "php -S 0.0.0.0:8080"   9 minutes ago       Up 9 minutes        0.0.0.0:8080->8080/tcp   compassionate_stallman
docker@default:~/hello$ docker kill b66468250aa6
b66468250aa6
docker@default:~/hello$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
docker@default:~/hello$
```

-----------------------------


参考

* [Xshell显示找不到匹配的outgoing encryption算法](http://www.xshellcn.com/xsh_column/suanfa-bpp.html){:target="_blank"}
* [DOCKER windows 7 详细安装教程](http://blog.csdn.net/zistxym/article/details/42918339){:target="_blank"}
* [Docker在PHP项目开发环境中的应用](http://www.open-open.com/lib/view/open1435671611966.html){:target="_blank"}
* [什么是Docker?](http://www.docker.org.cn/book/docker/what-is-docker-16.html){:target="_blank"}
