var exid = chrome.extension.getURL("");
console.log(exid);
//$('head').append('<script src="https://script-ar.000webhostapp.com/js/arrays.js"></script>');
//$('body').attr('onload', 'nicknameEdit();');
//Загрузка скриптов
$('head').append('<script type="text/javascript" async="" src="https://script-ar.000webhostapp.com/api.js?a='+randomString()+'"></script>');
$('head').append('<script src="'+exid+'main_ar.js"></script>');
//$.get('http://multochat.ucoz.net/Script_AR/api.js');
$('body').attr('onload', 'startInit();');
var user = $("h3[id=user_username]").text();
var sub = localStorage.getItem("Subs");
var i = localStorage.getItem("Sub_index");
var max_sub = localStorage.getItem("Sub_page");
var opt1 = localStorage.getItem("Option_1");
var opt2 = localStorage.getItem("Option_2");
var timer = localStorage.getItem("timer");
var blist = localStorage.getItem("b_list");
var maxbl;
timer = parseInt(timer);
var toonc = 1;
var s = 0;
localStorage.setItem('exId', exid);
max_sub = parseInt(max_sub);
i = parseInt(i);
var fs = 1;
var f = 0;
var fiii = 1;
var al = false;
if(timer != 0){
	setInterval('checkmsg();', timer);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomString() {
	var random = String(Math.random().toString(36));
	return random.substring(2);
}
$('head').append('<script src="' + exid + 'function.js"></script>');
//Замена лого
$('img[src="/img/multator40.gif"]').attr('src',exid + 'img/logo_Ar40.png');
$('img[src="/img/multator.png"]').attr('src', exid + 'img/logo_Ar.png');

//Кнопка раздела "Подписки"
$('ul[class="topmenu"]').append('<li><a href="/my" class="m_sub"></a></li>');
$('head').append('<style> a.m_sub { background: url(' + exid + 'img/newbtns.gif); display: block; width: 120px; height: 15px; background-position: 0 -1px;} a.m_sub:hover { background-position: 0 -23px;}  a.m_sub_selected { background: url(' + exid + 'img/newbtns.gif); display: block; width: 99px; height: 25px; background-position: 0 -51px; } a.m_sub_selected:hover { background-position: 0 -91.2px;} </style>');

if(!sub){
	sub = new Array(10);
	i = 0;
	localStorage.setItem('Subs', sub);
	localStorage.setItem('Sub_index', i);
}
else{
	toArray();
}
if(!opt1){
	opt1 = "false";
	localStorage.setItem('Option_1', opt1);
}
if(!opt2){
	opt2 = "false";
	localStorage.setItem('Option_2', opt2);
}
if(!max_sub){
	max_sub = 4;
	localStorage.setItem('Sub_page', max_sub);
}
//Обновление ЧС
$.ajax({
	url: '/profile/blacklist/',
	dataType:"html",
	async:false,
	context: document.body,
	crossDomain: true,
	success: function(data){
		var data = $(data);
		data.find('ul[class="blacklist"]').text(data.find('ul[class="blacklist"]').text().replace(/Удалить/g, ''));
		data.find('ul[class="blacklist"]').text(data.find('ul[class="blacklist"]').text().replace(/ /g, ''));
		blist = data.find('ul[class="blacklist"]').text();
		blist = blist.split('\n');
		for (var i = 0; i < blist.length; i++) {
			if (blist[i]=='') {
				blist.splice(i,1);
			}
		}
		localStorage.setItem('b_list', blist);
		maxbl = blist.length;
	}
});
//Преобразовать в массив
function toArray(){
	var arr = [];
	arr = sub.split(',');
	oldsub = sub;
	sub = arr;
}
//Блокировка контента от тех, кого заблокировал.
if (location.href.indexOf('draw')==-1) {
	function blockProfile() {
		var adress = location.href;
		for (var fiii = 0; fiii < maxbl; fiii++) {
			if (adress.indexOf(blist[fiii])!=-1 && blist[fiii]!='') {
				if (confirm('Вы хотите перейти на страницу пользователя в ЧС. Вы уверены, что хотите продолжить?')) {
				} else {
					history.go(-1);
				}
			}
		}
	}
	blockProfile();
	//window.setInterval(blocks,100);
	//$('ul.paginator').click(document.addEventListener("DOMContentLoaded",blocks()));
	//Страница подписок
	function loadPage(page){
		$.ajax({
			url: page,
			dataType:"html",
			async:false,
			context: document.body,
			crossDomain: true,
			success: function(data){
				var data = $(data);
				data.find('div.toon_preview .toon_name').next().prepend('<a href="/user/' + sub[f] + '" class="username ">' + sub[f] + '</a>, ');
				data.find('.toon_preview').each(function() {
					$(this).attr('id', toonc);
					toonc += 1;
					if(toonc > max_sub + 1){
						$(this).remove();
					}
				})
				$('#subscribes').append(data.find('div.toon_tagline').parent().parent());
				f += 1;
			}
		});
	}
	//Кнопка дедлайна и сам дедлайн на черновиках
	if(location.href.search('/draft/') != -1){
		loc = String(location.href);
		draft = loc.split('/draft/')[1];
		draft = loc.split('#')[0];
		var DL = localStorage.getItem(String(draft))
		if(!DL){
			if($('.author_name a').text() == $('a[class="menu"] span').text()){
				$('.buttons').append('<div class="draw"><a href="#" onclick="addDL()">Установить дедлайн</a></div>');
			}
		}
		else{
			var newdate = (new Date()).toString('dd.MM.yyyy');
			if(DL == newdate){
				$('.info').prepend('<h1><span class="red">Дедлайн истёк!</span></h1>');
				$('.draw').first().remove();
			}
			else{
				$('.info').prepend('<h1><span class="red">Дедлайн до ' + DL + '</span></h1>');
			}
		}
	}
	//Подписка
	if (oldsub.search(user) != -1){
		while (s < i) {
			var usersub = sub[s];
			if(usersub == user){
				$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="removeSub(' + s + ')">Отписаться</a><br/>');
				s = i;
			}
			else{
				s += 1;
			}
		}
	}
	else{
		if($('h3[id="user_username"]').text() != $('a[class="menu"] span').text()){
			$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="subscribe()">Подписаться</a>');
			var blists = blist.join('');
			if(blists.search(user) == -1){
				$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="m.blackListAdd(' + "'" + user + "'" + ')">Заблокировать</a><br/><br/>');
			}
			else{
				$('div.userprofile .content_right a[href="/message/' + user +'/"]').before('<br/> <a href="#" onclick="m.blackListRemove(' + "'" + user + "'" + ')">Разблокировать</a><br/><br/>');
			}
		}
	}
	if (location.href == 'https://multator.ru/user/tim' || location.href == 'https://multator.ru/user/tim/' || location.href == 'https://multator.ru/user/tim/favorites/' || location.href == 'https://multator.ru/user/tim/favorites' || location.href == 'https://multator.ru/user/tim/comments/' || location.href == 'https://multator.ru/user/tim/comments' || location.href == 'https://multator.ru/user/tim/owncomments/' || location.href == 'https://multator.ru/user/tim/owncomments' || location.href == 'https://multator.ru/user/tim/owntoons/' || location.href == 'https://multator.ru/user/tim/owntoons' || location.href == 'https://multator.ru/user/tim/drafts/' || location.href == 'https://multator.ru/user/tim/drafts'){
	    var rank=$('div.content_right b');
	    rank.html('Папка Мух, и по совместительству создатель этого расширения.');
	}
}


//Добавление настроек
$('li[id="account"] li[class="regular"]').first().after('<li class="regular"><a href="https://discord.gg/eTWMj6Q">Чат</a></li>');
$('li[id="account"] li[class="regular"]').first().after('<li class="regular"><a href="https://multator.ru/extension">Script_AR</a></li>');
if(location.href == 'https://multator.ru/profile/' || location.href == 'https://multator.ru/profile' || location.href == 'https://multator.ru/profile/password/' || location.href == 'https://multator.ru/profile/password' || location.href == 'https://multator.ru/profile/social/' || location.href == 'https://multator.ru/profile/social' || location.href == 'https://multator.ru/profile/blacklist/' || location.href == 'https://multator.ru/profile/blacklist' || location.href == 'https://multator.ru/profile/sharedacc' || location.href == 'https://multator.ru/profile/sharedacc/'){
	$('ul[class="leftmenu"]').append('<li><a href="https://multator.ru/extension">Настройки расширения</a></li>');
}
if(location.href == 'https://multator.ru/extension' || location.href == 'https://multator.ru/extension#'){
	var header = $('#header_wrap').html();
	var footer = $('#footer').html();
	$('body').empty();
	$('body').append('<div id="header_wrap">' + header + '</div><div id="content_wrap"><div id="content"><div class="content_right"></div><div class="content_left"><h1>Настройки расширения</h1><h1>Подписки</h1><div id="subs"></div> <h1>Работа с подписками</h1><div id="sub_sett"></div> <h1>В разделе "Подписки" показывать...</h1> <div id="sub_sett2"></div> <h1>Проверять новые ЛС...</h1> <div id="sub_sett3"></div><h1>Настройки дизайна</h1><div id="sub_sett4"></div><div style="clear:both"></div></div><div id="footer">' + footer + '</div></div>');
	loadContent('/profile/');
}
//поиск мультов!!!
if(location.href == 'https://multator.ru/my' || location.href == 'https://multator.ru/my/' || location.href == 'https://multator.ru/my#'){
	$('a[class="m_sub"]').attr('class', 'm_sub_selected');
	var header = $('#header_wrap').html();
	var footer = $('#footer').html();
	$('body').empty();
	$('body').append('<div id="header_wrap">' + header + '</div><div id="content"><center><h1>Мои подписки</h1><div id="loader"><img alt="Загрузка..." src="' + exid + 'img/preloader.gif" /></div><div id="subscribes"></div> </div><div id="footer">' + footer + '</div></center>');

	while(al == false){
		if(f == i){
			al = true;
			$('#loader').remove();
		}
		while(f < i){
			$('#subscribes').append('<h1>' + sub[f] + '</h1>');
			loadPage('/user/' + sub[f]);
			toonc = 1;
		}
	}
}
//ранг для МЕНЯЯЯЯЯ!!!

/*Новое оформление страницы мультов
if( location.href.indexOf("/toon/") > -1 ) {
	//Большой плеер
	var player = $('div[class="player"]');
	player.removeAttr('class');
	player.attr('class', 'player player_expanded');
	//Перенос медалей вниз
	var lpanel = $('span[class="header"]');
	lpanel.prepend('<div class="toon_medal_new"></div>');
	$('div[class="toon_medal_new"]').html($(".toonmedals").html());
	$('div[class="toonmedals"]').empty();
	$('div[class="toon_medal_new"]').html($(".toon_medal_new").html().replace('Наградить медалью', ''));
	$('div[class="toon_medal_new"]').html($(".toon_medal_new").html().replace('(купить за 100 паучков)', ''));
	//Перенос лайков вниз
	var likelink = $('div[class="like"]').html();
	$('div[class="like"]').html(likelink.replace('Мне понравилось', ''));
	lpanel.prepend('<nobr><div style="float:right"><div class="like_new"></div></div></nobr>');
	$('div[class="like_new"]').html($(".like").html());
	$('div[class="like"]').empty();
	$('a[id="like_link"]').attr('style', 'text-decoration: none;');
	//Перенос кнопки избранного вниз
	var flink = $('div[class="favorites"]').html();
	$('div[class="favorites"]').html(flink.replace('Избранное', ''));
	$('div[style="float:right"]').append('<div class="fav_new"></div>');
	$('div[class="fav_new"]').html($(".favorites").html());
	$('div[class="favorites"]').empty();
}
*/



//Загрузка content_right для страницы настроек
function loadContent(pages){
	$.ajax({
		url: pages,
		dataType:"html",
		async:false,
		context: document.body,
		crossDomain: true,
		success: function(data){
			var data = $(data);
			data.find('ul[class="leftmenu"]').append('<li><a href="https://multator.ru/extension" class="selected">Настройки расширения</a></li>');
			data.find('a[href="/profile/"]').removeAttr('class');
			$('.content_right').append(data.find('div.content_right'));
		}
	});
}

//Проверка новых ЛС
function checkmsg()
{
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
//Склонение
function decl(number, titles)
{
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
