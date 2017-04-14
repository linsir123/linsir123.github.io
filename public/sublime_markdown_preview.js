/**
 * UML
 * 
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
(function(win, doc) {
    function onReady(fn) {
        if (doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', fn);
        } else {
            doc.attachEvent('onreadystatechange', function() {
                if (doc.readyState === 'interactive')
                    fn();
            });
        }
    }

    win.convertUML = function(className, converter, settings) {
        var charts = doc.querySelectorAll("pre." + className),
            arr = [],
            i, j, maxItem, diagaram, text, curNode;

        // Is there a settings object?
        if (settings === void 0) {
            settings = {};
        }

        // Make sure we are dealing with an array
        for (i = 0, maxItem = charts.length; i < maxItem; i++) arr.push(charts[i])

        // Find the UML source element and get the text
        for (i = 0, maxItem = arr.length; i < maxItem; i++) {
            childEl = arr[i].firstChild;
            parentEl = childEl.parentNode;
            text = "";
            for (j = 0; j < childEl.childNodes.length; j++) {
                curNode = childEl.childNodes[j];
                whitespace = /^\s*$/;
                if (curNode.nodeName === "#text" && !(whitespace.test(curNode.nodeValue))) {
                    text = curNode.nodeValue;
                    break;
                }
            }

            // Do UML conversion and replace source
            el = doc.createElement('div');
            el.className = className;
            parentEl.parentNode.insertBefore(el, parentEl);
            parentEl.parentNode.removeChild(parentEl);
            diagram = converter.parse(text);
            diagram.drawSVG(el, settings);
        }
    }

    onReady(function() {
        convertUML('uml-flowchart', flowchart, {
            'yes-text': '是',
            'no-text': '否'
        });
    });

    onReady(function() {
        convertUML('uml-sequence-diagram', Diagram, { theme: 'simple' });
    });
})(window, document);


/**
 * @param  {Array}
 * @return {[type]}
 */
$(document).ready(function() {
    // 
    var zNodes = [];

    InitToc();

    //
    // if ($(".uml-sequence-diagram").length > 0 || $(".uml-flowchart").length > 0) {
    //     setTimeout(InitKeywords, 1000);
    // } else {
    //     InitKeywords();
    // }
    InitKeywords();


    /**
     * 格式化关键字
     */
    function InitKeywords() {
        $("svg tspan").each(function() {
            FormatKeywords(this)
        });

        $("div.codehilite pre").each(function() {
            FormatKeywords(this)
        });
    }

    /**
     * 初始化`段落`标题以及`目录`标题
     */
    function InitToc() {
        // 
        TocPretty(null, "", 0, 0);

        TitlePretty(1, null, "");

        //
        // console.log(zNodes);
        var zSetting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        $("div.toc")
            .empty().prepend("<b>文章目录</b>")
            .removeClass("toc").addClass("zTreeDiv")
            .append("<ul id='myZTree' class='ztree'>");
        $.fn.zTree.init($("#myZTree"), zSetting, zNodes);
    }

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

    /**
     * 格式化目录标题
     * 
     * @param {[type]} childList [description]
     * @param {[type]} preText   [description]
     * @param {[type]} pId       [description]
     */
    function TocPretty(childList, preText, pId, level) {
        if (childList == undefined || childList == null) {
            childList = $(".toc > ul > li");
        } else {
            childList = $(childList);
        }

        // console.log(preText);
        // console.log(childList);

        childList.each(function(i) {
            var myList = $(" > ul > li", this);
            var myText = (preText == "" ? "" : preText + ".") + (i + 1);
            var tmp = $("<span>", {
                text: myText + " "
            });
            tmp.prependTo($(" > a", this));

            // zTree Data
            var zId = parseInt(myText.replace(/\./g, ""));
            var zName = $(" > a", this).text();
            var zUrl = $(" > a", this).attr("href");
            var zParent = pId == 0 ? 1 : 0;
            var zOpen = level < 1 ? 1 : 0;
            zNodes.push({
                id: zId,
                pId: pId,
                name: zName,
                open: zOpen,
                isParent: zParent,
                url: zUrl,
                target: "_self"
            });

            //
            TocPretty(myList, myText, zId, level + 1);
        });
    }

    /**
     * [FormatKeywords description]
     * @param {[type]} Jdom [description]
     */
    function FormatKeywords(Jdom) {
        var txt = $(Jdom).text();
        txt = $.trim(txt);
        if (txt == "") {
            return;
        }

        //
        var re = /\`([^\`]+)\`/ig;
        if (re.test(txt)) {
            txt = txt.replace(re, "<tspan class='gd'>$1</tspan>");
            $(Jdom).html(txt);
            // console.log(txt);
        }
    }
});
