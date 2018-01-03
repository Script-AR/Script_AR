var loc = location.href;
var sub = localStorage.getItem("sub");
var subi = localStorage.getItem("Sub_index");
var exid = localStorage.getItem("exid");
/*localStorage.setItem('news', news);
localStorage.getItem("news");*/
var standartSett = [
	false,
	false,
	"4",
	"-",
	"false",
	"false",
	"false",
	"true"
];
var sett = [];
for (var i = 0; i < standartSett.length; i++) {
	sett[i] = localStorage.getItem('sett'+i);
	if (sett[i] === null) {
		sett[i] = standartSett[i];
		localStorage.setItem('sett'+i,sett[i]);
	}
}

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
var oldsub = localStorage.getItem('sub');
var s = 0;
var f = 0;
var f2 = 0;
var f3 = 0;
var user = $("h3[id=user_username]").text();
var draft;
var datesave;
//Загрузка переменных
if(!sub){
	sub = [];
	//subi = 0;
	localStorage.setItem('sub', sub);
	//localStorage.setItem('Sub_index', subi);
}
else{
	toArray();
}
//Бомбошич, комментарии для тебя
//Страница настроек
if(loc.indexOf('u/profile/extension') > -1){
	$('#Subs').append('<p style="font-size: 14px;">Вы подписаны на ' + subi + ' пользователей:</p><br/>');
	for(var i = 0; i < sub.length; i++ ) {
		var usersub = sub[i];
		$('#Subs').append('<p style="font-size: 14px;"><a href="/user/' + usersub + '" id="' + i + '" class="username ">' + usersub + '</a> <a href="#" onclick="removeSub(' + i + ')">[Отписаться]</a></p><br/>');
	}
	/* При добавлении новых вводов (input с type="text"),
	которые предназначены только для чисел, ставить на низ аттрибут 'isnum'.
	Инпуты с этим аттрибутом будут проверятся на наличие не чисел. */

	$('head').append('<link href="'+exid+'style.css?" type="text/css" rel="stylesheet">')
	$('#settings').append('<form name="formar"></form>');

 	$('form[name="formar"]').append(`<h2>Настройка подписок</h2><br>
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb0" id="sett0" /> Выделять рамки мультов кумиров</label></p><br/>
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb1" id="sett1" /> Выделять ники кумиров на превью мультов</label></p><br/>
	<p style="font-size: 14px;"><label>Количество показываемых мультов фаворита: <input type="text" name="cb2" id="sett2" isnum /></label></p><br/>
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb3" id="sett3" /> Показывать черновики в подписках</label></p><br/>`);

	$('form[name="formar"]').append(`<h2>Проверка ЛС</h2><br>
	<!--<p style="font-size: 14px;"><label><input type="radio" name="checkMess" id="sett3" /> никогда</p><br/>-->
	<p style="font-size: 14px;"><label>Проверять сообщения каждые <input type="text" name="cb4" id="sett4" isnum /> секунд.</label></p><br/>
	<h2>Дизайн</h2><br>

	<p style="font-size: 14px;"><label><input type="checkbox" name="cb5" id="sett5" /> Старый шрифт описания</label></p><br/>
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb6" id="sett6" /> Большие превью мультов в комментариях и ЛС</label></p><br/>
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb7" id="sett7" /> Анимированные превью в комментариях и ЛС</label></p><br/>`);

	$('form[name="formar"]').append(`<h2>Модули</h2><br>
	Расширение состоит из различных модулей, каждый из которых выполняет свою функцию. <br>
	С кажды обновлением функций становится всё больше, не всем нужны все функции, но тем не менее они тормозят работу сайта.<br>
	С помощью управления модулей можно подогнать функционал расширения про себя. При наведении мыши на название модуля появится краткая аннотация.<br>)
	<p style="font-size: 14px;"><label><input type="checkbox" name="cb8" id="sett8" /> Полная блокировка</label></p><br/>`);

	showSettings();

}

$('#sub_sett3').append('<br> <button id="saveScriptSett" class="green">Сохранить настройки</button><br>');
var saveButton = $('#saveScriptSett');
saveButton.click(saveSettings);
//Настройки
//not('toon_preview large')
if(sett[0] == "true"){
	if(location.href != 'https://multator.ru/my' || location.href != 'https://multator.ru/my/' || location.href != 'https://multator.ru/my#'){
		for(var i = 0; i < sub.length; i++){
			author = $('div.toon_tagline a[href="/user/' + sub[i] + '"].username').parent().parent();
			author.attr('style', 'width:208px;border:solid;border-color:#33aa00;border-width:1px;');
		}
	}
}
if(sett[1] == "true"){
	for(var i = 0; i < sub.length; i++){
		kumir = $('div.toon_tagline a[href="/user/' + sub[i] + '"].username');
		kumir.attr('style', 'color:#ff6600 !important');
	}
}

// Проверка ввода на странице настроек
function controleInputs() {
	if (elems[i].hasAttribute('isnum')) {
		if (isNaN(elems[i].value)) {
			elems[i].setAttribute('style','background:#ffaf99');
			alert('Не корректный ввод! Ввод должен содержать только числа!Измените ввод, и сохраните настройки еще раз!');
		}
		else if (parseInt(elems[i].getAttribute('isnum') !== '') && parseInt(elems[i].value) > parseInt(elems[i].getAttribute('isnum'))) {
			elems[i].setAttribute('style','background:#ffaf99');
			alert('Не корректный ввод! Вводимое значение не должно быть больше ' + elems[i].getAttribute('isnum'));
		}
		else if (elems[i].getAttribute('style').indexOf('background:#ffaf99') != -1) {
			elems[i].removeAttribute('style');
			localStorage.setItem('sett'+i, elems[i].value);
		}
		else {
			localStorage.setItem('sett'+i, elems[i].value);
		}
	}
}

// Сохранение настроек
function saveSettings() {
	var form = document.forms.formar;
	var elems = form.elements;
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].getAttribute('type') == 'text') {
			controleInputs();
		}
		else {
			localStorage.setItem('sett'+i, elems[i].checked);
		}
	}
}

//Установка положений переключателей на странице настроек
function showSettings() {
	var form = document.forms.formar;
	var elems = form.elements;
	for (var i = 0; i < elems.length; i++) {
		if (sett[i] == 'true') {
			elems[i].checked = true;
		}
	    else if (sett[i] != 'false') {
	    	elems[i].value = sett[i];
	    }
	}
}

// Удаление подписки
function removeSub(favour){
	if(confirm("Вы уверены, что хотите отписаться от новостей пользователя " + favour + "?")){
		sub.splice(favour, 1);
		//subi--;
		localStorage.setItem('sub', sub);
		//localStorage.setItem('Sub_index', subi);
		var usersub = sub[subNum];
		if(loc.indexOf('u/profile/extension') > -1){
			$('a[href="/user/' + favour + '"]').remove();
			$('a[onclick="removeSub(' + favour + ')"]').remove();
		}
		else{
			$('a[onclick="removeSub(' + favour + ')"]').remove();
		}
	}
}

// Перевод подписок в массив с сохранением изначальной строки
function toArray(){
	var arr = sub.split(',');
	sub = arr;
}

//Установка подписки
function subscribe(favour){
	if (oldsub.indexOf(favour) != -1){
		alert("Вы уже подписаны!");
	}
	else{
		if (confirm("Вы уверены, что хотите подписаться на новости пользователя " + favour + "?")) {
			//alert("Подписка оформлена!");
			//subi = parseInt(subi);
			sub[sub.length] = favour;
			oldsub = sub.join();
			localStorage.setItem('sub', oldsub);
			//localStorage.setItem('Sub_index', subi);
		}
	}
	$('a[onclick="subscribe()"]').remove();
}
