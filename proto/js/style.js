var calciumSprite = {
    images:['img/calcium.png'],
    frames:{width:160,height:160},
    //止まっているときは34番目の画像を表示、0－33の間を繰り返す
    animations:{
        stand:24,
        walk:[0,23],
        stop:24
    }
}

//変数を定義
var item_parent = ".slide";
var item = item_parent + " > .item";
var item_n = -1;
var item_html = [];
var item_current = 0;
var item_next = 1;
var max_height = 0;

//関数を定義
//次のアイテムを出力する
function next_show() {
	if(item_current == item_n){
		item_next = 0;
	} else {
		item_next = item_current + 1;
	}
	$(item_html[item_next]).addClass("next").appendTo(item_parent).css("opacity",0);
	if(item_current == item_n){
		item_current = 0;
	} else {
		item_current ++;
	}
}

//アイテムをスライドさせる
function item_slide() {
	$(item + ":first").animate({
		"left":"-50px",
		"opacity":0
	}, 500, function(){
		$(this).remove();
	});
	$(item + ".next").animate({
		"left":"0",
		"opacity":1
	}, 500).removeClass("next");
	next_show();
}

//初期化
$(document).ready(function(){
//html要素を取得・配列化
	$(item).each(function(i){
		item_html[i] =  $(this).html();
		item_html[i] = '
' + item_html[i] + '
';
		item_n ++;

		//ついでに各要素の高さを取得し、最大値をmax_heightに代入
		this_height = $(this).height();
		if(max_height < this_height){
			max_height = this_height;
		}
	});

	//スライドの大枠の高さを、アイテムの高さの最大値に合わせる。
	$(item_parent).css("height",max_height);

	//スライドの1つ目以外を消去
	$(item).not(":first").remove();
	next_show();

	//一定間隔でスライドさせる
	setInterval("item_slide()", 5000);
});
