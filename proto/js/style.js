
// スプライトアニメーションをスライドで実装するJs
/**********************************************************************/
/*/通常のスプライト（参考）
var basicSprite = {
    images:['img/spraiteimg.png'],
    frames:{width:160,height:160},
    //止まっているときは34番目の画像を表示、0－23の間を繰り返す
    animations:{
        stand:24,
        walk:[0,23],
        stop:24
    }
}*/
/**********************************************************************/

//変数を定義
var item_parent = ".splash-image-wrap";
var item_child = ".splash-image";
var autoplay = true;   //自動再生
var autoplaySecond = 600;
var stopFrame = 18;    //ストップを設定しないときは0
var fade = true;      //フェードアニメーションの有無
var slick = false;     //スライドアニメーションの有無
var animSecond = 500; //フェード・スライド秒数

//初期化（上記で定義した変数に合わせて動的に初期化されます）
var item = item_parent + " " + item_child;
var item_next = 1;
var item_n = 0;       //総スライド数
var slideWidth = 0;
$(document).ready(function(){
  var max_height = 0;   //スライドの最大高さ
  var max_width = 0;    //スライドの最大幅
  var item_html = $(item_parent).children();
  console.log(item_html);
  //条件にあったhtml要素を取得・配列化
	$(item).each(function(i){
		item_n ++;
		//各要素の高さを取得し、最大値をmax_heightに代入
		this_height = $(this).height();
		if(max_height < this_height){
			max_height = this_height;
		}
    this_width = $(this).width();
    if(max_width < this_width){
			max_width = this_width;
		}
	});
	//スライドの大枠の高さを、アイテムの高さの最大値に合わせる。
	$(item_parent).css("height",max_height);
  //スライドアニメーションさせる場合、アイテムの最大幅をスライド距離とする
  if(slick){
    slideWidth = max_width;
  }
  //一定間隔でスライドさせる関数に引数を渡す
  var FuncToString = function(){item_slide(item_html);};

	//スライドの1つ目以外を消去
	$(item).not(":first").remove();
  console.log(item_html[0]);
	next_show(item_html);

  //自動再生なら
  if(autoplay){
    //一定間隔でスライドさせるタイマーを0N
  	startTimer(FuncToString);
  }
});

//関数を定義
//タイマー0N/0FF
var timer;
function startTimer(FuncToString){
  timer = setInterval(FuncToString, autoplaySecond);
}

//次のアイテムを出力する（自動再生の場合）
var currentCount = 0; //スライドした回数
function next_show(array) {
  console.log(array[item_next]);
  var onPlay = true;
  //自動ストップ（再生スライド数）が指定されていたら
  if(stopFrame){
    currentCount++;
    if(currentCount == stopFrame){
      onPlay = false;
      currentCount = 0;
      clearInterval(timer);
    }
  }
  console.log(currentCount);
  if(onPlay){
    $(array[item_next]).addClass("next").appendTo(item_parent).css("opacity",0);
    if(item_next+1 == item_n){
  		item_next = 0;
  	} else {
  		item_next += 1;
  	}
  }
}

//アイテムをスライドさせる
function item_slide(array) {
  //フェードアニメーションさせる場合
  var opacityValue = 0;
  if(!fade){
    opacityValue = 1 ;
  }
  //現在表示してるものをアニメーションさせながら消す
	$(item + ":first").animate({
		"left":-slideWidth+"px",
		"opacity":opacityValue
	}, animSecond, function(){
    $(this).css("left",0);
		$(this).remove();
	});
  //次に表示させるものを表示
	$(item_child + ".next").animate({
		"left":0,
		"opacity":1
	}, animSecond).removeClass("next");
	next_show(array);
}
