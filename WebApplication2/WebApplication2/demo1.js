


/*
	//alert(Base.getId('box'));
	Base.getId('box').css('color','red').css('backgroundColor', 'black').html('pox').click(function () {
		alert('a');
	}).addClass('a');
	
	Base��һ��������ĺ��Ķ���
	Base.getId('box')���ص���һ��divElement�����������û��css������
	��Base.getId('box')���ظĳ�Base���ɣ�����Base����
	Base.getId('box').css('color','red')���ص�Ҳ��Base����
	Base.getId('box').css('color','red').css('backgroundColor', 'black')���Ƿ��ص�Base����
	Base.getId('box').css('color','red').css('backgroundColor', 'black').html('pox')Ҳ�Ƿ��ص�Base����
	Base.getId('box').css('color','red').css('backgroundColor', 'black').html('pox').click(function () {
		alert('a');
	}); click����ִ�����֮�󣬻��Ƿ��ص�Base����
	
	
	
	��Base�����У����css����,html����,click����
	
	var base = new Base();
	base.getId('box').style.color = 'red';
	base.getId('box').style.backgroundColor = 'black';
	base.getId('box').innerHTML = 'pox';
	base.getId('box').onclick = function () {
		alert(this.innerHTML);
	};
*/
window.onload = function () {

    //    base.getId('box').style.color = 'red';
    //    base.getId('box').style.backgroundColor = 'black';
    //    base.getId('box').Css('color', 'red').Css('background','black');
    //    $().getTagName('p').Css('color', 'red').Css('backgroundColor', 'green').Html('qqqq').Click(function () { alert('aaa'); });
    //        $().getId('box').Css('color','green').Css('backgroundColor','pink').Html('test123');
    //    $().getId('box').Css('color', 'red');
    //    $().getId('d').addClass('class', 'a b c').addClass('class','a b'); ;
    $().getTagName('div').addClass('class', 'a b c');
    $().addRule(0, 'div', 'padding:10px', 0);
    $().addRule(0, 1).addRule(0, 2);
}

//window.onload = function () {
//	alert(base.getId('box').elements.length);
//	$().getId('box').css('color', 'red').css('backgroundColor', 'black');
//	alert(base.getTagName('p').elements.length);
//	$().getTagName('p').css('color', 'green').html('����').click(function () {
//		alert('a');
//	}).css('backgroundColor', 'pink');
//};
















