var exid = chrome.extension.getURL("");
var currentPage = location.href;
var regexpLoc1 = /\/user\//;
var regexpLoc2 = /\/profile\//;
var regexpLoc3 = /\/message\//;
var regexpLoc5 = /\/last\//;

//Загрузка JSON
/*$.getJSON('https://raw.githubusercontent.com/Script-AR/server/master/api.json?a='+randomString(),function(data){
    console.log(data.usersArray[1]);
});*/
$('img[src="/img/multator40.gif"]').attr('src',exid + 'img/logo_Ar40.png');
$('img[src="/img/multator.png"]').attr('src', exid + 'img/logo_Ar.png');
//window.setInterval(nicknameEdit,1);
var a = $('span.header');
 if (currentPage.indexOf('draw')==-1) {

   // --Добавление прайза на странице мульта--
  //Решение проблемы комментариев
  var user = $('#user_username > a').html();
  var comments = $('a[href="/user/'+user+'/comments/"]');
  comments.attr('href','/user/'+user+'/owncomments/');
  comments = $('h1[style="font-weight:normal"');
  comments.remove();

  //Выбор озвучки к прослушиванию
  if (currentPage.indexOf('/toon/')!=-1) {
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
//Просмотр непромодерированных флэш-мультов
if (location.href.indexOf('')) {

}
//Совместные порисульки
if (currentPage.indexOf('/draw/')!= -1) {
    var editor = $('embed'); // вынимаем  редактор
    var flashHref = editor.attr('src'); // вынимаем ссылку
    //console.log(flashHref);
    var sessStart = flashHref.indexOf('=')+1; //ищем начало сессии
    //console.log(sessStart);
    var session = flashHref.substring(sessStart);// вынимаем сессию
    var preSess = flashHref.substring(0,sessStart);//сохраняем ссылку на актуальную версию
    console.log(session);
    function sessSet() {
        var newSess = prompt('Это рисовальная сессия. Скопируйте её если хотите кому-то передать или введите новую.',session);
        if (newSess !== 'null') { //если пользователь решил ввести новую сессию.
            var endHref = preSess+newSess;
            editor.attr('src',endHref);
        }
        else { //если пользователь нажал отмена
            //ничего не происходит
        }
        // ветвление для того что-бы при отмене сессия не становилась null
    }
    editor.parent().parent().before('<button id="abyrvalg" style="display:block">Изменить сессию редактора</button>');
    $('#abyrvalg').click(sessSet);
    $('#abyrvalg').after('<button id="exit"><span class="red">Выйти</span></button>');
    $('#exit').click(toAnonym)
}

function setPrize() {
    if (currentPage.indexOf('/toon/')!=-1) {
     var regexps1 = [/foinmakzj2w7/];
     for (var i = 0; i < regexps1.length; i++) {
       if (currentPage.search(api.toons.contest[i])!=-1) {
         var prizes = $('div.prizes');
         prizes.html('<div class="prize toon_prize_2">Участинк конкурса</div>')
       }
     }
     var regexps2 = [/l19maksmce9n/];
     for (var i = 0; i < api.toons.winner.length; i++) {
       if (currentPage.search(api.toons.winner[i])!=-1) {
         var prizes = $('div.prizes');
         prizes.html('<div class="prize toon_prize_3">Центр первого Опрелько</div>')
       }
     }
     var regexps3 = [/vgabombowejn/,/eyxaqdtim9zv/,/a2vlrom96e39/,/0fxlekviiwt0/];
     for (var i = 0; i < api.toons.crown.length; i++) {
       if (currentPage.search(api.toons.crown[i]) != -1) {
         var prizes = $('div.prizes');
         prizes.html('<div class="prize toon_prize_6"><b>Битва за корону<b></div>')
       }
     }
   }
}

function setBorder() {
    for (var i = 0; i < api.toons.contest.length; i++) {
      $('.toon_preview_'+api.toons.contest[i]).addClass('prize_2');//Присваивание массиву класса - зелёная рамка (участник конкурса)
    }
    for (var i = 0; i < api.toons.winner.length; i++) {
      $('.toon_preview_'+api.toons.winner[i]).addClass('prize_3');// Жёлтая рамка - победитель в конкурсе.
    }
    for (var i = 0; i < api.toons.crown.length; i++) {
      $('.toon_preview_'+api.toons.crown[i]).addClass('prize_6');// Золотая рамка - битва за корону.
    }
    for (var i = 0; i < api.toons.kiskis.length; i++) {
       $('.toon_preview_'+api.toons.kiskis[i]).addClass('prize_5');//Бежевая рамка - тянучка
   }
}

function toUser() {
    document.cookie='PHPSESSID='+oldUserSession+';path=/;';
}

function toAnonym() {
    if (confirm('Вы уверены что хотите выйти?')) {
        var oldUserSession = getCookie('PHPSESSID');
        console.log(oldUserSession);
        document.cookie = 'PHPSESSID='+randomString()+randomString()+';path=/;expires=1917-10-25;';
        console.log('q');
        $('#exit').removeAttr('class');
        $('#exit').attr('style','color:green');
        $('#exit').html('Войти');
        $('#exit').unbind('click',toAnonym);
        $('#exit').click(function(){
            document.cookie='PHPSESSID='+oldUserSession+';path=/;';
        });
    }
}

function nicknameEdit() {
  if (currentPage.search(regexpLoc1)!=-1 || currentPage.search(regexpLoc2)!=-1||currentPage.indexOf('/toon/')!=-1||currentPage.search(regexpLoc5)!=-1) {
    for (var i = 0; i < data.usersArray.length; i++) {
      var author = $('a[href="/user/'+data.userArray[i]+'"].username');
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function randomString() {
  	var random = String(Math.random().toString(36));
  	return random.substring(2);
  }
