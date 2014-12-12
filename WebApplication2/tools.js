
//浏览器检测
(function () {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
})();

//DOM加载
function addDomLoaded(fn) {
    var isReady = false;
    var timer = null;
    function doReady() {
        if (timer) clearInterval(timer);
        if (isReady) return;
        isReady = true;
        fn();
    }

    if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
        //无论采用哪种，基本上用不着了
        /*timer = setInterval(function () {
        if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
        doReady();
        }
        }, 1);*/

        timer = setInterval(function () {
            if (document && document.getElementById && document.getElementsByTagName && document.body) {
                doReady();
            }
        }, 1);
    } else if (document.addEventListener) {//W3C
        addEvent(document, 'DOMContentLoaded', function () {
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    } else if (sys.ie && sys.ie < 9) {
        var timer = null;
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll('left');
                doReady();
            }
            catch (e) { 
             };
        }, 1);
    }
}

//兼容IE和非IE删除外联CSS文件中的样式
function tDeleteRule(sheetstyle,position) {
    if (typeof sheetstyle.deleteRule != 'undefined') {
        sheetstyle.deleteRule(position);
    }
    else {
        sheetstyle.removeRule(position);
    }
}
//兼容IE和非IE添加外联CSS文件中的样式
function tAddRule(sheetstyle,cssrule,csstext,position) {
    if (typeof sheetstyle.insertRule != 'undefined') {
        var cssstr = cssrule + '{' + csstext + '}';
        sheetstyle.insertRule(cssstr, position);
    }
    else {
        sheetstyle.addRule(cssrule, csstext, position);
    }
}
//兼容IE非IE获取行内，外连CSS属性值
function tCss(element, attr) {

    var value;
    if (typeof window.getComputedStyle != 'undefined') {//判断非IE方法是否合法，如果合法就调用
        value=window.getComputedStyle(element, null)[attr];
    }
    else if (typeof element.currentStyle != 'undefined'||typeof element.currentStyle !=null) {//判断IE方法是否合法，如果合法调用
        value=element.currentStyle[attr];
    }
    else {
        value=element.style[attr]; //读取行内style
    }
    return value;
}
//兼容IE非IE获取视窗大小
function tGetInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {
            width: window.innerWidth, 
            height: window.innerHeight
        }
    }
    else{
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}
//兼容IE非IE获取事件
function tGetEvent(event) {
    return event || window.event;
}
//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    } else {
        //创建一个存放事件的哈希表(散列表)
        if (!obj.events) obj.events = {};
        //第一次执行时执行
        if (!obj.events[type]) {
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //把第一次的事件处理函数先储存到第一个位置上
            if (obj['on' + type]) obj.events[type][0] = fn;
        }
        else {
            if (addEvent.equal(obj.events[type], fn)) {
                return false;
             }
        }
        //从第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj['on' + type] = addEvent.exec;
    }
}
//匹配默认属性和方法
addEvent.fixEvent = function (event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;
}
 
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false;
}
addEvent.fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
}

//为每个事件分配一个计数器
addEvent.ID = 1;
//执行所有事件
addEvent.exec = function (evt) {
    var e = evt || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es) {
        es[i].call(this, e);
    }
}
//判断事件是否已存在
addEvent.equal = function (es, fn) {
    for (var i in es) {
        if (es[i] == fn) {
            return true;
        }
    }
    return false;
}
//跨浏览器删除事件
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else {
        for (var i in obj.events[type]) {
            if (obj.events[type][i] == fn) {
                delete obj.events[type][i];
             }
           }
    }
}
//获取事件元素
function getTarget(evt) {

    var e = event || window.event;
    if (e.target) {
        return e.target;
    }
    else if (e.srcElement) {
        return e.srcElement;
    }
}
