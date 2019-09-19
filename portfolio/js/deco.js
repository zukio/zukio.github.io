/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */



  $(function() {

    //マウスを乗せたら発動
    $('.item-wrap').hover(function() {
      //マウスを乗せたら色が変わる
      $('#flash').css('visibility','visible')
      .animate({opacity: 0,backgroundColor:'#ffff00'}, 500, 'swing',function(){
        //ここにはマウスを離したときの動作を記述
        $('#flash').css('visibility','hidden')
        .css({opacity: 100,backgroundColor:'#fff'})//色指定を空欄にすれば元の色に戻る
        .stop(false, true);
      });
    });
  });
});
