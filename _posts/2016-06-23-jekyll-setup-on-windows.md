---
layout: post
title:  "[Jekyll] Windows本地环境安装"
categories: [jekyll]
---

Jekyll是一个用于构造静态化网站的工具或框架。可以按照Jekyll的目录结构提交到`Github pages`，自动生成对应的静态网站。
当然也可以在自己的本地安装一个jekyll的环境，用于本地预览（Jekyll需要通过Ruby的Gem包管理器进行安装）。

在官网上可以获取到在Windows下的安装过程 [http://jekyllrb.com/docs/windows/](http://jekyllrb.com/docs/windows/){:target="_blank"}

以下简单整理一下，安装过程：

* 用管理员权限打开cmd
* 安装[Chocolatey](https://chocolatey.org/){:target="_blank"} (Windows下用于安装应用程序) 

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

* 安装好Chocolatey后就可以用`choco`命令安装ruby等应用程序

```
choco install ruby -y
```

* 接下来就可以用`gem`来安装Jekyll

```
gem install jekyll
```

* 验证Jekyll是否安装成功，创建一个站，并且开启预览服务

```
jekyll new myblog
cd myblog
jekyll serve
```

* 如果不是一个空站，并且使用了Jekyll的分页功能而还需要安装jekyll-paginate插件（其它插件类似）

```
gem install jekyll-paginate
```
