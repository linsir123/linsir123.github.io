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

```js
{
	// 可以在默认样式的基础上进行调整
	"css": ["default","E:\\sublime_markdown_preview.css"],

	// 可以在导出后的HTML中引入js脚本
	"js": ["http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js","E:\\sublime_markdown_preview.js"],

	// 支持uml流程图和时序图
	"enable_uml": true,

	"enable_highlight": true
}
```


#### sublime_markdown_preview.css

```css
*{
	font-family: Consolas,"lucida Grande",Verdana,"Microsoft YaHei";
}
body{
	width: 50em;
}
code{
	color: #c7254e;
	background-color: #f9f2f4;
	border-radius: 4px;
}
tspan{
	font-size: 12px;
}
.markdown-body{
	line-height: 1.5;
}
.markdown-body p{
	font-size: 14px;
}
.markdown-body li{
	font-size: 14px;
}
.markdown-body li>p{
	margin: 10px 0;
}


/**/
.markdown-body h1{
	color: #009193;
	border-bottom: none;
}
.markdown-body h2{
	color: #009193;
	border-bottom: 1px solid #009193;
	font-size: 24px;
}
.markdown-body h3, .markdown-body h4, .markdown-body h5{
	color: #6C8C37;
	font-size: 20px;
}
.markdown-body h4{
	font-size: 18px;
}


/**/
.task-list-item{
	font-size: 14px;
}
.task-list-item p{
	margin-bottom: 4px;
}


/**/
div.toc{
	position: fixed;
	top: 10px;
	right: 10px;
	padding: 10px;
	border:1px solid #ccc;
	border-radius: 5px;
}
div.toc b{
	border-bottom: 1px solid #EDF3DE;
	display: block;
	padding-bottom: 5px;
	margin-bottom: 10px;
}
div.toc li{
	line-height: 1.5;
}
div.toc ul{
	padding-left: 1.1em;
}
div.toc a{
	font-size: 14px;
	color: #6C8C37;
}
div.toc a:hover{
	text-decoration: none;
	color: #009193;
}
```


#### sublime_markdown_preview.js

```js
$(document).ready(function() {
	// 
	var toc = $("div.toc");
	toc.prepend("<b>文章目录</b>");

	// 
	TitlePretty(1, null, "");

	/**
	 * 格式化段落标题
	 * 
	 * @param {[type]} parentLevel   [description]
	 * @param {[type]} parentNode [description]
	 * @param {[type]} preText    [description]
	 */
	function TitlePretty(parentLevel, parentNode, preText) {
		if (parentLevel == 1) {
			var childList = $("h2");
		} else {
			var untilKey = "h" + parentLevel;
			var findKey = "h" + (parentLevel + 1);
			var childList = parentNode.nextUntil(untilKey, findKey);
		}

		// console.log(preText);
		// console.log(childList);

		childList.each(function(i) {
			var myText = (preText == "" ? "" : preText + ".") + (i + 1);
			var tmp = $("<span>", {
				text: myText + " "
			});
			tmp.prependTo(this);

			//
			TitlePretty(parentLevel + 1, $(this), myText);
		});
	}

	// 
	TocPretty(null, "");

	/**
	 * 格式化目录标题
	 * 
	 * @param {[type]} childList [description]
	 * @param {[type]} preText   [description]
	 */
	function TocPretty(childList, preText) {
		if (childList == undefined || childList == null) {
			childList = $(".toc > ul > li");
		} else {
			childList = $(childList);
		}

		// console.log(preText);
		// console.log(childList);

		childList.each(function(i) {
			var myText = (preText == "" ? "" : preText + ".") + (i + 1);
			var tmp = $("<span>", {
				text: myText + " "
			});
			tmp.prependTo($(" > a", this));

			//
			TocPretty($(" > ul > li", this), myText);
		});
	}
});
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
