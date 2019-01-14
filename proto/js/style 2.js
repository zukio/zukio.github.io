
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
var slick = false;    //スライドアニメーションの有無
var animSecond = 500; //フェード・スライド秒数
//一連のアニメーションを再生・停止した後、特定のフレームをループする
var loopList = [0,1];
var loopTimes = 10;

//初期化（上記で定義した変数に合わせて動的に初期化されます）
var item = item_parent + " " + item_child;
var item_next = 1;
var item_n = 0;       //総スライド数
var max_height = 0;   //スライドの最大高さ
var max_width = 0;    //スライドの最大幅
var item_html = [];   //条件にあったhtml要素
$(document).ready(function(){
  //条件にあったhtml要素を取得・配列化
  item_html = $(item_parent).children();
	$(item).each(function(i){
		//item_html[i] =  $(this).html();
		item_n ++;

		//ついでに各要素の高さを取得し、最大値をmax_heightに代入
		this_height = $(this).height();
		if(max_height < this_height){
			max_height = this_height;
		}
    this_width = $(this).width();
    if(max_width < this_width){
			max_width = this_width;
		}

	});
  console.log(this_height,max_width);
	//スライドの大枠の高さを、アイテムの高さの最大値に合わせる。
	$(item_parent).css("height",max_height);

	//スライドの1つ目以外を消去
	$(item).not(":first").remove();
  var item_htmlCheck = $(item_parent).children();
	next_show();

  //自動再生なら
  if(autoplay){
    //一定間隔でスライドさせるタイマーを0N
    var FuncToString = "item_slide()";
  	startTimer(FuncToString);
  }
});


//関数を定義
//タイマー0N/0FF
var timer;
function startTimer(FuncToString){
  timer = setInterval(FuncToString, autoplaySecond);
}
function stopTimer(){
  clearInterval(timer);
}

//次のアイテムを出力する（自動再生の場合）
var currentCount = 0; //スライドした回数
function next_show() {
	$(item_html[item_next]).addClass("next").appendTo(item_parent).css("opacity",0);
  if(item_next+1 > item_n-1){
		item_next = 0;
	} else {
		item_next += 1;
	}
  //自動ストップ（再生スライド数）が指定されていたら
  if(stopFrame){
    currentCount++;
    if(currentCount == stopFrame){
      stopTimer();
      currentCount = 0;
      //ストップ後のループが設定されていたら
      if(loopList.length){
        console.log(loopList);
      }
    }
  }
}

function loopSlide(){
  
}

//アイテムをスライドさせる
function item_slide() {
  //スライドアニメーションさせる場合
  var slideWidth = 0;
  if(slick){
    slideWidth = max_width ;
  }
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
	next_show();
}
