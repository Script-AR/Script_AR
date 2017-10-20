var currentPage = location.href;
var regexpLoc1 = /\/user\//;
var regexpLoc2 = /\/profile\//;
var regexpLoc3 = /\/message\//;
var regexpLoc4 = /\/toon\//;
var regexpLoc5 = /\/last\//;
/*var frontNickArr = ['Maks_Malewish','tim','Bomboscha','_Kvin_','sadsanta','Multator.ru','Diiir'];
var endNickArr = ['Акроним','tim','Bomboscha','_Kvin_','sasdanta','Multator.ru','Diiir'];
var rangArr = ['Двухмерная Максемилиан Абу Ибн Хасан','Папка мух','Администратор расширения','Король ХудОбыыЫ','Администратор сайта(починился)','Администратор сайта(починился)','2 администратор сайта(почти сломался)'];
var nickClassArr = ['anonymous','moderator','red moderator','crown'];*/
//--изменение ников и рангов --
//var json = $.getScript('https://scriptar.000webhostapp.com/js/arrays.json');
//var nickObject = JSON.parse(json);
/*function nicknameEdit() {
  if (currentPage.search(regexpLoc1)!=-1 || currentPage.search(regexpLoc2)!=-1||currentPage.search(regexpLoc4)!=-1||currentPage.search(regexpLoc5)!=-1) {
    for (var i = 0; i < frontNickArr.length; i++) {
      var author = $('a[href="/user/'+frontNickArr[i]+'"].username');
      if (author.html() == frontNickArr[i]) {
        author.html(endNickArr[i]);
        author.addClass(nickClassArr[i]);
        author.removeAttr('style');
        if (currentPage.search(regexpLoc5)==-1) {
          var rang = $('div[class="content_right"] b');
        }
        rang.html(rangArr[i]);
      }
    }
  }
  if (currentPage.search(regexpLoc3)!=-1) {
    //alert('jh');
    //var mess = $('a[href="/message/'+frontNickArr[i]'"].username');/message/tim
    for (var i = 0; i < frontNickArr.length; i++) {
      var mess = $('a[href="/message/'+frontNickArr[i]+'"].username');
    if (mess.html() == frontNickArr[i]) {
        mess.html(endNickArr[i]);
        mess.addClass(nickClassArr[i]);
        mess.removeAttr('style');
    }
    var author = $('a[href="/user/'+frontNickArr[i]+'"].username')
   if (author.html() == frontNickArr[i]) {
      author.html(endNickArr[i]);
      author.addClass(nickClassArr[i]);
      author.removeAttr('style');
    }
    }
      }
  }
window.setInterval(nicknameEdit,1);*/
//include('https://script-ar.000webhostapp.com/js/arrays.js');
//window.setInterval(nicknameEdit,1);
var a = $('span.header');
//alert(a.html());
 if (currentPage.indexOf('draw')==-1) {
   //  --Рамки мультов--
   var toons1 = ['.toon_preview_foinmakzj2w7'];
   //Группировка всех рамок в массив
   for (var i = 0; i < toons1.length; i++) {
     $(toons1[i]).addClass('prize_2');//Присваивание массиву класса - зелёная рамка (участник конкурса)
   }
    var toons2 = ['.toon_preview_l19maksmce9n'];
   for (var i = 0; i < toons2.length; i++) {
     $(toons2[i]).addClass('prize_3');// Жёлтая рамка - победитель в конкурсе.
   }
   var toons3 = ['.toon_preview_vgabombowejn','.toon_preview_eyxaqdtim9zv','.toon_preview_a2vlrom96e39','.toon_preview_0fxlekviiwt0'];
   for (var i = 0; i < toons3.length; i++) {
     $(toons3[i]).addClass('prize_6');// Золотая рамка - битва за корону.
   }
   var toons4 = ['.toon_preview_8nqcnbom1jk9'];
    for (var i = 0; i < toons4.length; i++) {
      $(toons4[i]).addClass('prize_5');//Бежевая рамка - тянучка
    }
   // --Добавление прайза на странице мульта--
   var currentPage = location.href;
   var regexp1 = /\/toon/;
   if (currentPage.search(regexp1)!=-1) {
    var regexps1 = [/foinmakzj2w7/];
    for (var i = 0; i < regexps1.length; i++) {
      if (currentPage.search(regexps1[i])!=-1) {
        var prizes = $('div.prizes');
        prizes.html('<div class="prize toon_prize_2">Участинк конкурса</div>')
      }
    }
    var regexps2 = [/l19maksmce9n/];
    for (var i = 0; i < regexps2.length; i++) {
      if (currentPage.search(regexps2[i])!=-1) {
        var prizes = $('div.prizes');
        prizes.html('<div class="prize toon_prize_3">Центр первого Опрелько</div>')
      }
    }
    var regexps3 = [/vgabombowejn/,/eyxaqdtim9zv/,/a2vlrom96e39/,/0fxlekviiwt0/];
    for (var i = 0; i < regexps3.length; i++) {
      if (currentPage.search(regexps3[i])!=-1) {
        var prizes = $('div.prizes');
        prizes.html('<div class="prize toon_prize_6"><b>Битва за корону<b></div>')
      }
    }
  }

  //Решение проблемы комментариев
  var user = $('#user_username > a').html();
  var comments = $('a[href="/user/'+user+'/comments/"]');
  comments.attr('href','/user/'+user+'/owncomments/');
  var comments = $('h1[style="font-weight:normal"');
  comments.remove();

  //Выбор озвучки к прослушиванию
  if (currentPage.search(/\/toon\//)!=-1) {
    var player = $('embed').attr('src');
    if (player.indexOf('sound:')!= -1) {
      var pos = player.indexOf('sound:')+18;
      var soundNum = player.charAt(pos);
      if (soundNum>1) {
        $('#toon_title').parent().after(`
          <form name="form0">
          <span style="color:#999999">Сейчас проигрывается </span>
          <select id="soundNum" class="red"></select> <span style="color:#999999"> озвучка.</span></form>`);
        for (var i = soundNum; i >= 1; i--) {
          $('#soundNum').prepend('<option>'+i+'</option>')
        }
        var select = $('#soundNum');
        select.change(function(){
          var currentSound = select.val();
          var playerNew = player.substring(0,pos)+currentSound+player.substring(pos+1);
          $('embed').attr('src',playerNew);
        });
      }
    }
  }
 }


//$('[onclick="return m.blackListAdd(\'lexsey\')"]').remove();
