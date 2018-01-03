//Альтернативная функция входа. Различие: не пересылает на страницу соцсетей при отсутствии оных
function login2(){
    $.ajax({
        type: 'POST',
        url: '/login/',
        data: ({
            'username':$('#l_username').val(),
            'password':$('#l_password').val(),
            'captcha':$('#l_captcha').val(),
            'auto_login':$('#auto_login:checked').val()?1:0
        }),
        success: function(data) {
            if (data.result == 'ok') {
                location.reload();
                return;
            }
            else {
                $('.captcha').show();
                $('.login-popup .captcha img').attr('src', '/login/image.jpg?'+Math.random());
                $('#l_captcha').val('');
            }
            if (data.errtype == 1) {
                alert(i18n('Enter the number that you see.'));
                $('.login-popup .captcha').removeClass('hidden');
            }
            else if (data.errtype == 2) {
                alert(i18n('You are banned.'));
            }
            else if (data.errtype == 3) {
                alert(i18n('Wrong number.'));
                $('#l_captcha').focus();
            }
            else if (data.errtype == 4) {
                alert(i18n('Password disabled. Please use password reminder for change your password.'));
                window.location.href = '/recover/';
            }
            else if (data.errtype == 5) {
                alert(i18n('Account disabled. Go ahead.'));
                $('#l_captcha').focus();
            }
            else if (data.errtype == 6) {
                alert(i18n('You are not registered.'));
            }
            else {
                alert(i18n('Wrong username or password.'));
                $('#l_password').val('');
                $('#l_password').focus();
            }
        }
    });
    return false;
}

//Функции необходимые для первых
//Операции необходимые для побочных функций
var maxbl;
if (location.href.indexOf('ru/draw/') == -1) {

    //blocks();
    //Отправка комментов. Отличие: выполняет функции blocks и смену ников
    function postComm() {
      $('#comments_form').hide();
      $.ajax({
          type: 'POST',
          url: location.href,
          data: ({
              comment: $('#comment_text').val(),
              flags: $('.comment_flags:checked').val()
              }),
          success: function(data) {
              if (data.result == 'ok') {
                  $('#comments').html(data.comments);
                  //blocks();
                  startInit();
    							replaceFunc('onclick','return m.postComment()','postComm()');
                  console.log('ok');
              }
              else {
                  alert(data.message);
              }
          }
      });
      return false;
    }
    //Отправка ЛС. Различие: изменяет ники
    function sendMess() {
      $.ajax({
          type: 'POST',
          url: location.href,
          data: ({
              message: $('#message_text').val()
              }),
          success: function(data) {
              if (data.result == 'ok') {
                  $('#messages').html(data.messages);
                  replaceFunc('onclick','return m.postMessage()','sendMess()');
                  startInit();
                  console.log('ok');
              }
              else {
                  alert(data.error);
              }
          }
      });
      $('#message_text').val('');
      return false;
    }
    //Занос в ЧС. Отличие: добавляет юзера в blist в хранилище
    function addToBlack(username) {
        if (!confirm('Вы уверены, что хотите заблокировать пользователя?')) return false;
        $.ajax({
            type: 'POST',
            url: '/profile/',
            data: ({
        action: 'blacklist',
                user: username
            }),
            success: function(data) {
                if (data.result == 'ok') {
                    alert(`Пользователь заблокирован. Поскольку включён режим полной блокировки,
                        вы не будете видет мульты пользователя. Если вы этого не хотие, вам
                        нужно отключить режим полной блокировки.`);
            $('ul.blacklist').append('<li data-bl-username="'+username+'" class="username"><a href="#" onclick="m.blackListRemove(\''+username+'\')">'+i18n('Remove')+'</a> '+username+'</li>');
            var blist = localStorage.getItem('blist');
            if (blist !== null) {
                blist = blist.split(',');
                blist.push(username);
                blist = blist.join(',');
                localStorage.setItem('blist',blist);
            }
            else {
                blist = [];
                blist.push(username);
                blist = blist.join(',');
                localStorage.setItem('blist',blist);
            }
                }
        else {
            alert(data.message);
        }
            }
        });
        return false;
    }
    //Вынос из ЧС. Отличие: выносит юзера из blist в хранилище
    function removeFromBlack(username) {
        $.ajax({
            type: 'POST',
            url: '/profile/',
            data: ({
        action: 'blacklist',
                user: username,
        remove: 1
            }),
            success: function(data) {
                if (data.result == 'ok') {
                    $('li[data-bl-username="'+username+'"]').remove();
                    var blist = localStorage.getItem('blist').split(',');
                    for (var i = 0; i < blist.length; i++) {
                        if (blist[i] == username) {
                            blist.splice(i,1);
                            break;
                        }
                    }
                    blist = join(blist);
                    localStorage.setItem('blist',blist);

                }
        else {
            alert(data.message);
        }
            }
        });
        return false;
    }
    replaceFunc('onclick','return m.postComment()','postComm()');
    replaceFunc('onclick','return m.postMessage()','sendMess()');

    /*function blocks(){
        var blist = localStorage.getItem('blist');
        blist = blist.split(',');
        if (location.href.indexOf('u/sandbox') != -1) {
            var overToonArr = ['wbhzdtyomap2','sgmcve936ast','d9e3obiwaivx','wjhc8musmils','sdbkkdonngf0'];
            var overAuthorArr = ['TyomaSkelet','CVETNOI-','obiwankenobi05','SmileStickStudio','Donnie_Brasko'];
        }
        //else if(location.href) {
            var overToonArr = ['71szrobotkmw','atwbraicdolc','o3blicandypt','hxmpssavem34','m3donn2tr4re'];
            var overAuthorArr = ['Robot2014','brainslavsky','candy_dude','Saveliy8lollo','Donnie_Brasko'];
            for (var i = 0; i < blist.length; i++) {
                var hater = $('.toon_preview a[href="/user/' + blist[i] + '"].username:first').parent().parent();
                    for (var k = 0; k < hater.length; k++) {
                        var random = getRandomInt(0,5);
                        var overToon = overToonArr[random];
                        var overAuthor = overAuthorArr[random];
                        if ($('.toon_moderator').length != 0) {
                            hater.html(`<div class="toon_image"><a title="Cпасибо `+overAuthor+` за работу!" href="https://multator.ru/user/`+overAuthor+`"><img alt="Cпасибо `+overAuthor+` за работу!" src="/preview/`+overToon+`" ></a></div>
                            <div class="toon_name"><a class="link" href="#">Мульт скрыт!</a></div><div class="toon_tagline">0 кадров</div>
                            <div class="toon_tagline">Пользователь в ЧС</div><div class="toon_tagline toon_moderator">	<a href="#" onclick="" title="Хорошо" class="mvote1">+</a>
                <a href="#" onclick="" title="Плохо" class="mvote2">-</a>
                <a href="#" onclick="" title="Ужасно" class="mvote3">✖</a></div>`);
                        }
                        else {
                            hater.html(`<div class="toon_image"><a title="Cпасибо `+overAuthor+` за работу!" href="https://multator.ru/user/`+overAuthor+`"><img alt="Cпасибо `+overAuthor+` за работу!" src="/preview/`+overToon+`" ></a></div>
                            <div class="toon_name"><a class="link" href="#">Мульт скрыт!</a></div><div class="toon_tagline">0 кадров</div>
                            <div class="toon_tagline">Пользователь в ЧС</div>`);
                        }
                    }

                var hatercomm = $('.comment a[href="/user/' + blist[i] + '"].username').parent().parent();
                hatercomm.html('<i>Комментарий скрыт!</i>');
            }*/
        //}
    //}
        //blocks();


    function replaceFunc(attrib,f1,f2) {
      	var postButton = $('['+attrib+'="'+f1+'"]');
      	postButton.removeAttr(attrib);
      	postButton.attr(attrib,f2);
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function block2() {
    var blist = localStorage.getItem('blist');
    var blist = blist.split(',');
    var overToonArr = ['71szrobotkmw','atwbraicdolc','o3blicandypt','hxmpssavem34','m3donn2tr4re'];
    var overAuthorArr = ['Robot2014','brainslavsky','candy_dude','Saveliy8lollo','Donnie_Brasko'];
    for (var i = 0; i < blist.length; i++) {
        var hater = $('.toon_preview a[href="/user/' + blist[i] + '"].username').parent().parent();
        for (var k = 0; k < hater.length; k++) {
            var random = getRandomInt(0,5);
            var overToon = overToonArr[random];
            var overAuthor = overAuthorArr[random];
            console.log(overAuthor);
            if ($('.toon_moderator').length != 0) {
                hater.slice(k,k+1).html(`<div class="toon_image"><a title="Cпасибо `+overAuthor+` за работу!" href="https://multator.ru/user/`+overAuthor+`"><img alt="Cпасибо `+overAuthor+` за работу!" src="/preview/`+overToon+`" ></a></div>
                <div class="toon_name"><a class="link" href="#">Мульт скрыт!</a></div><div class="toon_tagline">0 кадров</div>
                <div class="toon_tagline">Пользователь в ЧС</div><div class="toon_tagline toon_moderator">	<a href="#" onclick="" title="Хорошо" class="mvote1">+</a>
    <a href="#" onclick="" title="Плохо" class="mvote2">-</a>
    <a href="#" onclick="" title="Ужасно" class="mvote3">✖</a></div>`);
            }
        }
        console.log(hater);
    }
}
block2();
