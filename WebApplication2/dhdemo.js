$(function () {
    $('#button').Click(function () {
        $('#box').animate({
            'attr':'o',
            'target': 100,
            'step': 9
        })
    });
});