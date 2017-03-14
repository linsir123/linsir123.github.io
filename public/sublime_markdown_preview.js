$(document).ready(function() {
    // 
    var zNodes = [];
    var toc = $("div.toc");
    toc.prepend("<b>文章目录</b>");

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
            var zOpen = level < 2 ? 1 : 0;
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
});

// uml
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

    onReady(function() { convertUML('uml-flowchart', flowchart); });
    onReady(function() { convertUML('uml-sequence-diagram', Diagram, { theme: 'simple' }); });
})(window, document)
