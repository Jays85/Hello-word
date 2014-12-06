
$(function () {
    var ul = $('ul');
    $('.member').Hover(function () {
        $(this).Css('background', 'url(images/arrow2.png) no-repeat 5px center;');
        ul.show();
    }, function () {
        $(this).Css('background', 'url(images/arrow.png) no-repeat 5px center;');
        ul.hide();
    });
    var login = $('#login');
    var screen = $('#screen');
    login.setCenter(350, 250).reSize(function () {
        login.setCenter(350, 250);
        if (login.Css('display') == 'Block') {
            screen.operationLock('lock');
        }
    });
    $('.close').Click(function () { login.hide(); screen.operationLock('unlock'); });
    $('.login').Click(function () { login.show(); screen.operationLock('lock'); });

    login.onMouseMove('screen');


    $('div div p').Css('color', 'red');





})













