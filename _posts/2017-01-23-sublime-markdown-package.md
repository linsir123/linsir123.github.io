---
layout: post
title:  "[Sublime] Sublime Text 2下markdown插件使用"
categories: [tools]
---

### Markdown Preview
---------------------

可以用于预览和导出markdown成为html文档的插件，使用`ctrl + shift + p`的包管理工具进行安装。
使用`ctrl + b`就可导出对应的html文档。


#### MarkdownPreview.sublime-settings

通过修改配置可以添加css美化，tasklist, flowchart, sequence等组的支持。
打开自定义配置文件`Preferences > Package Settings > Markdown Preview > Settings User`
并添加以下个选项

```json
{
	"enable_highlight": true,
	"css": [
		// 默认
		"https://linsir123.github.io/public/markdown.css",

		// zTree
		"https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.28/css/zTreeStyle/zTreeStyle.css",

		// 自定义
		"https://linsir123.github.io/public/sublime_markdown_preview.css"
	],
	"js": [
		// jquery
		"http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js",

		// zTree
		"https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.28/js/jquery.ztree.all.min.js",

		// 时序图 && 流程图
		"https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js",
		"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js",
		
		"https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.4/sequence-diagram-min.js",
		"https://cdnjs.cloudflare.com/ajax/libs/flowchart/1.6.5/flowchart.min.js",

		// 自定义
		"https://linsir123.github.io/public/sublime_markdown_preview.js"
	]
}
```

#### 流程图

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

#### 时序图

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
