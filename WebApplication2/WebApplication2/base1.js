//前台用$()来实例化一个新对像
var $ = function (args) {
    return new Base(args);
 }
function Base(args) {
    this.Ems = [];
    debugger;
     if (typeof args == 'string') {
         if (args.indexOf != -1) {
             var tempelements = args.split(' ');
             var childnode = [];
             var childelement = [];
             for (var i = 0; i < tempelements.length; i++) {
                 if (childnode.length == 0) {
                     childnode.push(document);
                 }
                 switch (tempelements[i].charAt(0)) {
                     case '#':
                         childelement = [];
                         childelement.push(this.getId(tempelements[i].substring(1)));
                         childnode = childelement;
                         break;
                     case '.':
                         childelement = [];
                         for (var j = 0; j < childnode.length; j++) {
                             var temps = this.getClass(tempelements[i].substring(1), childnode[j]);
                             for (var k = 0; k < temps.length; k++) {
                                 childelement.push(temps[k]);
                             }
                         }
                         childnode = childelement;
                         break;
                     default:
                         childelement = [];
                         for (var j = 0; j < childnode.length; j++) {
                             var temps = this.getTagName(tempelements[i], childnode[j]);
                             for (var k = 0; k < temps.length; k++) {
                                 childelement.push(temps[k]);
                             }
                         }
                         childnode = childelement;
                  }
             }
             this.Ems = childelement ;
         }
         else {
             switch (args.charAt(0)) {
                 case '#':
                     this.Ems.push(this.getId(args.substring(1)));
                     break;
                 case '.':
                     this.getClassName(args.substring(1));
                     break;
                 default:
                     this.Ems = this.getTagName(args);
             } 
         }
     }
     else if (typeof args == 'object' && args != undefined) {
         this.Ems[0] = args;
     }
     else if (typeof args == 'function') {
		this.ready(args);
	}

}
//第一个元素
Base.prototype.first = function () {
    return this.Ems[0];
}
//最后一个元素
Base.prototype.last = function () {
    return this.Ems[this.Ems.length - 1];
}
 //addDomLoaded
 Base.prototype.ready = function (fn) {
     addDomLoaded(fn);
 };
 Base.prototype.find = function (str) {
     var childelement = [];
     for (var i = 0; i < this.Ems.length; i++) {
         switch (str.charAt(0)) {
             case '#':
                 childelement.push(this.getId(str.substring(1)));
                 break;
             case '.':
                 var temps = this.getClass(str.substring(1), this.Ems[i]);
                 for (var j = 0; j < temps.length; j++) {
                     childelement.push(temps[j]);
                 }
                 break;
             default:
                 var temps = this.getTagName(str, this.Ems[i]);
                 for (var k = 0; k < temps.length; k++) {
                     childelement.push(temps[k]);
                 }
                 break;
         }
     }
     this.Ems = childelement;
     return this;
 }
 //跟据ID获取元素
 Base.prototype.getId = function (id) {
     return document.getElementById(id);
 };
 //跟据标签名获取元素
 Base.prototype.getTagName = function (TagName, parentnode) {
     var node;
     var temps = [];
     if (arguments.length == 1) {
         TagNames = document.getElementsByTagName(TagName);
     }
     else {
         if (parentnode != undefined && parentnode != 'undefined') {
             node = parentnode;
         }
         else {
             node = document;
         }
         var TagNames = parentnode.getElementsByTagName(TagName);
     }

     for (var i = 0; i < TagNames.length; i++) {
         temps.push(TagNames[i]);
     }
     return temps;
 }
 //删除属性
 Base.prototype.delClass = function (ClassName) {
     for (var i = 0; i < this.Ems.length; i++) {
         this.Ems[i].removeAttribute(ClassName);
     }
     return this;
 }
 //添加删除Class属性
 Base.prototype.addClass = function (ClassName, ClassValue) {
     for (var i = 0; i < this.Ems.length; i++) {
         if (arguments.length == 1) {
             this.Ems[i].removeAttribute(ClassName);
         }
         else {
             this.Ems[i].setAttribute(ClassName, ClassValue);
         }
     }
     return this;
 }
 //获取元素集合中指定元素
 Base.prototype.getElement = function (num) {
     if (arguments.length == 1) {
         var element = this.Ems[num];
         this.Ems = [];
         this.Ems[0] = element;
         return this;
     }
     else {
         return this;
     }
 }
 //跟据class类名获取元数
 Base.prototype.getClassName = function (ClassName, id) {
     var TagNames
     if (arguments.length == 1) {//只有一个属性就所有ClassName元素
         TagNames = document.getElementsByTagName('*');
     }
     else {//否则跟据ID获取ID区块下所有ClassName元素
         TagNames = document.getElementById(Id).getElementsByTagName('*');
     }
     for (var i = 0; i < TagNames.length; i++) {
         if (TagNames[i].className == ClassName) {
             this.Ems.push(TagNames[i]);
         }
     }
     return this;
 }
 //跟据class类名获取元数
 Base.prototype.getClass = function (ClassName, parentnode) {
     var TagNames;
     var node;
     var temps = [];
     if (arguments.length == 1) {//只有一个属性就所有ClassName元素
         TagNames = document.getElementsByTagName('*');
     }
     else {
         if (parentnode != undefined) {
             node = parentnode;
         }
         else {
             node = document;
         }
         TagNames = parentnode.getElementsByTagName('*');
     }
     for (var i = 0; i < TagNames.length; i++) {
         if (TagNames[i].className == ClassName) {
             temps.push(TagNames[i]);
         }
     }
     return temps;
 }
//鼠标移动事件
Base.prototype.Hover = function (over, out) {
    for (var i = 0; i < this.Ems.length; i++) {
        addEvent(this.Ems[i], 'mouseover', over);
        addEvent(this.Ems[i], 'mouseout', out);
    }
    return this;
}
//显示指定区块
Base.prototype.show = function () {
    for (var i = 0; i < this.Ems.length; i++) {
        this.Ems[i].style.display = 'block';
    }
    return this;
}

//设置隐藏区块
Base.prototype.hide = function () {
    for (var i = 0; i < this.Ems.length; i++) {
        this.Ems[i].style.display = 'none';
    }
    return this;
}

//添加删除外联CSS规则
Base.prototype.addRule = function (num, cssrule, csstext, position) {
    var sheetstyle = document.styleSheets[num];
    if (arguments.length == 2) {
        tDeleteRule(sheetstyle, position);
    }
    else if (arguments.length == 4) {
        tAddRule(sheetstyle,cssrule,csstext,position);
    }
    return this;
}  //设置元素居中
Base.prototype.setCenter = function (width, height) {
    var top = (tGetInner().height - height) / 2;
    var left = (tGetInner().width - width) / 2;
        for (var i = 0; i < this.Ems.length; i++) {
            this.Ems[i].style.top = top + 'px';
            this.Ems[i].style.left = left + 'px';
    }
    return this;
}
//窗体改变事件
Base.prototype.reSize = function (fn) {
//    window.onresize = fn;
    addEvent(window,'resize',fn);
    return this;
}
//设置行内CSS样式
Base.prototype.Css = function (attr, value) {
    for (var i = 0; i < this.Ems.length; i++) {
        if (arguments.length == 1) {//判断只有一个属性那么就取读CSS属性值
            return tCss(this.Ems[i], attr);
        }
        else {
            this.Ems[i].style[attr] = value;
        }
    }
    return this;
}
//添加单击方法
Base.prototype.Click = function (fn) {
    for (var i = 0; i < this.Ems.length; i++) {
        addEvent(this.Ems[i], 'click', fn);
    }
    return this;
}
//设置元素文本内容
Base.prototype.Html = function (str) {
    for (var i = 0; i < this.Ems.length; i++) {
        if (arguments.length == 0) {
            return this.Ems[i].innerHTML;
        }
        this.Ems[i].innerHTML = str;
    }
    return this;
}
//设置锁屏
Base.prototype.operationLock = function (status) {
    for (var i = 0; i < this.Ems.length; i++) {
        if (status == 'lock') {
            this.Ems[i].style.width = tGetInner().width + 'px';
            this.Ems[i].style.height = tGetInner().height + 'px';
            this.Ems[i].style.display = 'block';
            document.documentElement.style.overflow = 'hidden';
        }
        else if (status == 'unlock') {
            this.Ems[i].style.display = 'none';
            document.documentElement.style.overflow = 'auto';
        }
    }
    return this;
}
//移动动画
Base.prototype.animate = function (obj) {
    for (var i = 0; i < this.Ems.length; i++) {
        var element = this.Ems[i];
        var attr = obj['attr'] != undefined ? obj['attr'] : 'left';
        var step = obj['step'] != undefined ? obj['step'] : 10;
        var t = 50;
        var start = obj['start'] != undefined ? obj['start'] : tCss(element, attr);
        var target = obj['alter'] + start;
        if (start > target) setp = -setp;
        element.style[attr] = start + 'px';
        clearInterval(window.timer);
        timer = setInterval(function () {
            element.style[attr] = tCss(element, attr) + step + 'px';
            if (step > 0 && tCss(element, attr) >= target) {
                element.style[attr] = target + 'px';
                clearInterval(timer);
            } else if (step < 0 && tCss(element, attr) <= target) {
                element.style[attr] = target + 'px';
                clearInterval(timer);
            }
        }, t);
    }
    return this;
}
//调用插件
Base.prototype.Extend = function (name, fn) {
    Base.prototype[name] = fn;
}

