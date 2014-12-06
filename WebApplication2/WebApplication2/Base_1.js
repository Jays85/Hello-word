$().Extend('onMouseMove', function (tag) {
    var screen = $(tag);
    for (var i = 0; i < this.Ems.length; i++) {
        addEvent(this.Ems[i], 'mousedown', function (e) {
            //            e.preventdefault();
            var _this = this;
            var elementX = e.clientX - _this.offsetLeft;
            var elementY = e.clientY - _this.offsetTop;
            if (e.target.tagName == 'H2') {
                addEvent(document, 'mousemove', move);
                addEvent(document, 'mouseup', up);
            }
            else {
                removeEvent(document, 'mousemove', move);
                removeEvent(document, 'mouseup', up);
            }
            function move(e) {
                screen.operationLock('lock');
                var left = e.clientX - elementX;
                var top = e.clientY - elementY;
                if (left < 0) {
                    left = 0;
                }
                else if (left > tGetInner().width - _this.offsetWidth) {
                    left = tGetInner().width - _this.offsetWidth;
                }
                if (top < 0) {
                    top = 0;
                }
                else if (top > tGetInner().height - _this.offsetHeight) {
                    top = tGetInner().height - _this.offsetHeight;
                }
                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
            }
            function up(e) {
                removeEvent(document, 'mousemove', move);
                removeEvent(document, 'mouseup', up);
            }
        })
        return this;
    }
})