---
layout: post
title:  "[Sublime] Sublime Text 2下markdown插件使用"
categories: [tools]
---

### Markdown Preview
---------------------

可以用于预览和导出markdown成为html文档的插件，使用`ctrl + shift + p`的包管理工具进行安装。
使用`ctrl + b`就可导出对应的html文档。

通过修改配置可以添加css美化，tasklist, flowchart, sequence等组的支持。
打开自定义配置文件`Preferences > Package Settings > Markdown Preview > Settings User`
并添加以下个选项

```json
{
	// 可以在默认样式的基础上进行调整
	"css": ["default","E:\\sublime_markdown_preview.css"],
	"enable_highlight": true,

	// 支持uml流程图和时序图
	"enable_uml": true
}
```

sublime_markdown_preview.css

```css
*{
	font-family: Consolas,"lucida Grande",Verdana,"Microsoft YaHei";
}
tspan{
	font-size: 12px;
}
.task-list-item{
	font-size: 14px;
}
.toc a{
	font-size: 14px;
}
.task-list-item p{
	margin-bottom: 4px;
}
code{
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}
```

流程图的实现Demo

```
```flow
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...

st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1
```

时序图的实现Demo

```
```sequence
Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
```

### 参考
-----------------------------
* [Sublime Text 2/3 Markdown Preview](https://github.com/revolunet/sublimetext-markdown-preview){:target="_blank"}
