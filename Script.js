var loc = location.href;
var exid = chrome.extension.getURL("");
/*$.getJSON('https://raw.githubusercontent.com/Script-AR/server/master/api.json?a='+randomString(),function(data){
    console.log(data.usersArray[1]);
});*/
var sett = [
	localStorage.getItem('sett0'),
	localStorage.getItem('sett1'),
	localStorage.getItem('sett2'),
	localStorage.getItem('sett3'),
	localStorage.getItem('sett4'),
	localStorage.getItem('sett5'),
	localStorage.getItem('sett6'),
	localStorage.getItem('sett7'),
	localStorage.getItem('sett8')
];
/*
Справка настроек:
0 - выделение рамок
1 - выделение ников
2 - количество мультов фаворита в подписках
3 - показ черновиков в подписках
4 - интервал проверки сообщений в секундах
5 - старый шрифт описания
6 - большие превью мультов
7 - анимированные превью
8 - включение полной блокировки
*/
//Загрузка скриптов
localStorage.setItem('exid',exid);
$('head').append('<script src="'+exid+'main_ar.js"></script>');
$('head').append('<script src="' + exid + 'function.js"></script>');
var me = $("#account").children().children('span').text(); //Всегда даёт ник того, кто пользуется расширением
var sub = localStorage.getItem("sub");
//var i = localStorage.getItem("Sub_index");
//var max_sub = localStorage.getItem("Sub_page");
var blist = localStorage.getItem("blist");
var maxbl;
if (sett[3] != 'false') {
	var timer = parseInt(sett[3]);
}
//var subNum = 0;
localStorage.setItem('exid', exid);
//max_sub = parseInt(max_sub);
//i = parseInt(i);
var fs = 1;
var f = 0;
var fiii = 1;
var al = false;

/*if (timer) {
	setInterval('checkMess', timer*1000);
}*/
//Кнопка раздела "Подписки"
$('ul[class="topmenu"]').append('<li><a href="/my" class="m_sub"></a></li>');
$('head').append('<style> a.m_sub { background: url(' + exid + 'img/newbtns.gif); display: block; width: 120px; height: 15px; background-position: 0 -1px;} a.m_sub:hover { background-position: 0 -23px;}  a.m_sub_selected { background: url(' + exid + 'img/newbtns.gif); display: block; width: 99px; height: 25px; background-position: 0 -51px; } a.m_sub_selected:hover { background-position: 0 -91.2px;} </style>');
if(!sub){
	sub = [];
	oldsub = '';
    localStorage.setItem('sub', oldsub);
}
else{
	toArray();
}
//Смена функции добавления в ЧС: различие - заносит в Хранилище ник обидчика
if (loc.indexOf('/profile/blacklist') != -1){
	var addButton = $('button[onclick="return m.blackListAdd($(\'#add_username\').val())"]');
    addButton.remove();
    $('#add_username').after('<button onclick="addToBlack($(\'#add_username\').val())">Добавить</button>');
}
else if (loc.indexOf('ru/toon/') != -1 && $('.gray [href="#"]').length > 0) {
	var addButton = $('[onclick ^= "return m.blackListAdd"]');
	addButton = Array.prototype.slice.call(addButton);
    console.log(addButton.length);
	for (var i = 0; i < addButton.length; i++) {
        var buttonClick = addButton[i].getAttribute('onclick');
		var hater = buttonClick.split('return m.blackListAdd(\'');
		hater = hater[1].split('\')');
		var span = addButton[i].parentNode;
		var commDate = span.lastChild;
		console.log(commDate);
        span.innerHTML = '<a href="#" class="gray" onclick="addToBlack(\''+ hater[0] + '\')">Заблокировать</a>'+commDate.textContent;
	}
}
if (loc.indexOf('draw') == -1) {
	blockProfile();
	//Подписка
    if (oldsub.indexOf(user) != -1  && loc.indexOf('/user/') != -1){
		for(var i = 0; i < sub.length; i++) {
            console.warn(sub[0] == user);
			if(sub[0] == user){
				$('div.userprofile .content_right a[href="/message/\'' + user +'\'/"]').before('<br/> <a href="#" onclick="removeSub(\'' + sub[i] + '\')">Отписаться</a><br/>');
				break;
			}
		}
	}
	else {
		if(user != me && loc.indexOf('ru/user/') != -1){
			$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="subscribe('+"'"+user+"'"+')">Подписаться</a>');
			var blists = blist.join('');
			if(blists.indexOf(user) == -1){
				$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="addToBlack(' + "'" + user + "'" + ')">Заблокировать</a><br/><br/>');
			}
			else{
				$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="removeFromBlack(' + "'" + user + "'" + ')">Разблокировать</a><br/><br/>');
			}
		}
	}

    // Изменение страницы настроек
    if(loc.indexOf('u/profile/') > -1){
    	$('ul[class="leftmenu"]').append('<li><a href="/profile/extension">Настройки расширения</a></li>');
    }
    if(loc.indexOf('u/profile/extension') > -1){
        $('a[href="/profile/"]').removeAttr('class');
        $('a[href="/profile/extension"]').attr('class','selected');
        $('.content_left').empty();
    	$('.content_left').append('<div class="ar"><h1>Настройки расширения</h1><h2>Подписки</h2><div id="Subs"></div><div id="settings"></div><div id="sub_sett2"></div><div id="sub_sett3"></div><div id="sub_sett4"></div></div>');
    }

    //Загружает мульты на страницу пользователя
    function loadToons(user) {
        var toonc = 1;
    	$.ajax({
    		url: 'https://multator.ru/user/' + user,
    		dataType: "html",
    		async: false,
    		context: document.body,
    		crossDomain: true,
    		success: function(data){
    			var data = $(data);
    			//data.find('div.toon_preview .toon_name').next().prepend('<a href="/user/' + sub[f] + '" class="username ">' + sub[f] + '</a>, ');
    			data.find('.toon_preview').each(function() {
    				if ($(this).attr('class').indexOf('draft') != -1 && sett[3] == "true") {
    					$(this).remove();
    				} else {
    					$(this).attr('id', toonc);
    					toonc++;
    				}
    				if(toonc > parseInt(sett[2]) + 1){
    					$(this).remove();
    				}
    			})
    			$('#subscribes').append(data.find('div.toon_tagline').parent().parent());
    		}
    	});
    }

    //Спрашивает о продолжении при заходе на страницу обидчика
	function blockProfile() {
		for (var i = 0; i < maxbl; i++) {
			if (loc.indexOf(blist[i])!=-1 && blist[i]!='') {
				if (!confirm('Вы хотите перейти на страницу пользователя в ЧС. Вы уверены, что хотите продолжить?')) {
					history.go(-1);
				}
			}
		}
	}

    //Проверка новых ЛС
    function checkmsg() {
    	$.ajax({
    			url: 'https://multator.ru/',
    			dataType:"html",
    			async:false,
    			context: document.body.innerHTML,
    			crossDomain: true,
    			success: function(data){
    				var data = $(data);
    				var mess = data.find('a[href="/message/"] span').text();
    				if(mess){
    					mess = parseInt(mess);
    					$('li[id="mnumessages"]').html(data.find('li[id="mnumessages"]').html());
    				}
    			}
    	});
    }

}


//Добавление ссылок в меню под ником
$('li[id="account"] li[class="regular"]').first().after('<li class="regular"><a href="https://discord.gg/eTWMj6Q">Чат</a></li>');
$('li[id="account"] li[class="regular"]').first().after('<li class="regular"><a href="https://multator.ru/profile/extension">Script_AR</a></li>');

//поиск мультов!!!
if(location.href == 'https://multator.ru/my' || location.href == 'https://multator.ru/my/' || location.href == 'https://multator.ru/my#'){
	$('a[class="m_sub"]').attr('class', 'm_sub_selected');
	var header = $('#header_wrap').html();
	var footer = $('#footer').html();
	$('body').empty();
	$('body').append('<div id="header_wrap">' + header + '</div><div id="content"><center><h1>Мои подписки</h1><div id="loader"><img alt="Загрузка..." src="' + exid + 'img/preloader.gif" /></div><div id="subscribes"></div> </div><div id="footer">' + footer + '</div></center>');

        /*while(al == false){
    		if(f == i){
    			al = true;
    			$('#loader').remove();
    		}
    		for(var i = 0; i < sub.length; i++){
    			$('#subscribes').append('<h1>' + sub[i] + '</h1>');
    			loadToons(sub[i]);
    		}
    	}*/
        for (var i = 0; i < sub.length; i++) {
            $('#subscribes').append('<h1>' + sub[i] + '</h1>');
            loadToons(sub[i]);
        }
        $('#loader').remove();
}


//Склонение
function decl(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomString() {
	var random = String(Math.random().toString(36));
	return random.substring(2);
}

//Преобразовать в массив
function toArray(){
	var arr = sub.split(',');
	oldsub = sub;
	sub = arr;
}
