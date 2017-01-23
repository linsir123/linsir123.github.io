---
layout: post
title:  "[Sublime] Sublime Text 3下php插件使用"
categories: [tools]
---

### PHP Companion
-----------------------------

其中令人感到高兴的特性应该就是，可以实现点击跳转到对应的类或函数等等的声明处。

安装好插件并在Sublime Text 3 的用户目录下`%appdata%\Sublime Text 3\Packages\User`创建`Default.sublime-mousemap`文件，保存以下内容并重启；

```json
[
    {
        "button": "button1", 
        "count": 1, 
        "modifiers": ["ctrl"],
        "press_command": "drag_select",
        "command": "goto_definition"
    }
]
```

在Sublime Text中创建并引入php项目，按住键盘的`ctrl`并点击鼠标想跳转的地方，就可以跳转。

![st-click-to-definition](/public/images/st-click-to-definition.gif)

### 参考
-----------------------------

* [Sublime Text (3) for PHP Developers](https://mattstauffer.co/blog/sublime-text-3-for-php-developers){:target="_blank"}
