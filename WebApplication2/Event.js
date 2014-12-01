
//addEvent(window, 'load', function () {
//    var a = document.getElementById('a');
//    //    addEvent(d, 'click', init1);
//    //    addEvent(d, 'click', init2);
//    //    addEvent(d, 'click', init3);
//    //    addEvent(d, 'click', init4);
//    //    removeEvent(d,'click',init2);
//    addEvent(a, 'click', function (e) { e.preventDefault(); });
//});

//function init1(e) {
//    alert('1'+this.innerText+e.clientX);
//}
//function init2(e) {
//    alert('2' + this.innerText);
//}
//function init3(e) {
//    alert('3' + this.innerText);
//}
//function init4(e) {
//    alert('4' + this.innerText);
//}

//function mouseoverEvent(evt) {
//    var e = evt || window.event;
//    if (e.relatedTarget) {
//        alert(e.relatedTarget);
//    }
//    else {
//        alert(e.toElement.tagName);
//     }
// }
//function tored(evt) {
//    var that = getTarget(evt);
//    that.className = 'red'
//    removeEvent(that,'click', tored);
//    addEvent(that, 'click', toblue);
//}
//function toblue(evt) {
//    var that = getTarget(evt);
//    that.className = 'blue';
//    removeEvent(that,'click', toblue);
//    addEvent(that, 'click', tored);
//}

addEvent(window, 'load', function () {
    var d = document.getElementById('d');
    addEvent(d, 'click', function (e) {
        e.stopPropagation();
        alert('div');
    });
    addEvent(document, 'click', function () {
        alert('document');
    });
});