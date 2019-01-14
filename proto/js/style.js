
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
var item_parent = ".slide";
var item_child = ".item";
var autoplay = true;   //自動再生
var autoplaySecond = 1000;
var stopFrame = 5;    //ストップを設定しないときは0
var fade = true;      //フェードアニメーションの有無
var slick = true;    //スライドアニメーションの有無
var animSecond = 500; //フェード・スライド秒数
//一連のアニメーションを再生・停止した後、特定のフレームをループする
var loopList = [0,1];
var loopTimes = 10;

//初期化（上記で定義した変数に合わせて動的に初期化されます）
var item = item_parent + " " + item_child;
var item_next = 1;
var item_n = 0;       //総スライド数
$(document).ready(function(){
  var max_height = 0;   //スライドの最大高さ
  var max_width = 0;    //スライドの最大幅
  var item_html = $(item_parent).children();
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
  var slideWidth = 0;
  if(slick){
    slideWidth = max_width ;
  }
  //フェードアニメーションさせる場合
  var opacityValue = 0;
  if(!fade){
    opacityValue = 1 ;
  }
  //一定間隔でスライドさせる関数に引数を渡す
  var FuncToString = function(){item_slide(slideWidth,opacityValue,item_html);};

	//スライドの1つ目以外を消去
	$(item).not(":first").remove();
	next_show(item_html);

  //自動再生なら
  if(autoplay){
    //一定間隔でスライドさせるタイマーを0N
  	startTimer(FuncToString);
  }
  loopSlide(item_html);
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
	$(array[item_next]).addClass("next").appendTo(item_parent).css("opacity",0);
  if(item_next+1 > item_n-1){
		item_next = 0;
	} else {
		item_next += 1;
	}
  //自動ストップ（再生スライド数）が指定されていたら
  if(stopFrame){
    currentCount++;
    if(currentCount == stopFrame){
      clearInterval(timer);
      currentCount = 0;
    }
  }
}

function loopSlide(array){
  //ストップ後のループが設定されていたら
  if(loopList.length){
    var loopArray = [loopList.length];
    for(var i = 0; i < loopList.length; i++){
      loopArray[i] = array[loopList[i]];
    }
    console.log(loopArray);
  }
}

//アイテムをスライドさせる
function item_slide(slideWidth,opacityValue,array) {
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