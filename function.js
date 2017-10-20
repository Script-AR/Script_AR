var sub = localStorage.getItem("Subs");//test comment
var i = localStorage.getItem("Sub_index");
var max_sub = localStorage.getItem("Sub_page");
var opt1 = localStorage.getItem("Option_1");
var opt2 = localStorage.getItem("Option_2");
var timer = localStorage.getItem("timer");
var exid = localStorage.getItem("exId");
/*localStorage.setItem('news', news);
localStorage.getItem("news");*/

var oldsub = "";
var s = 0;
var f = 0;
var f2 = 0;
var f3 = 0;
var user = $("h3[id=user_username]").text();
var draft;
var datesave;
//Загрузка переменных
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
if(!timer){
	timer = "0";
	localStorage.setItem('timer', timer);
}
//Показать блок дедлайна
function addDL(){
	$('.buttons').append('<p>Установите дату формата 31.12.2017</p><div id="datepicker"><input id="date"></input><input class="green" type="submit" onClick="checkDL()" value="Готово"></input></div>');
	$('a[onclick="addDL()"]').remove();
}
//Проверка, соответствует ли дата шаблону
//Бомбошич, комментарии для тебя
function checkDL(){
	var dates = document.getElementById("date").value; //получаем значение текстового поля с датой
	dates = dates.split('.'); //преобразуем в массив
	if(dates.length < 3 || dates.length > 3){ //проверяем количество элементов в массиве
		wrongMsg('Должна быть дата формата 31.12.2017.');
	}
	else{ //если количество элементов равно 3, то есть если дата верного формата, проверяем дальше.
		setDL();
	}
}
//функция алерта сообщений об ошибке
function wrongMsg(msg){
	alert('Неверный формат даты! ' + msg);
}
//Функция установки дедлайна
function setDL(){
	if(confirm('Вы уверены? По истечению дедлайна черновик нельзя будет продолжить!')){
		datesave = document.getElementById("date").value;
		loc = String(location.href);
		draft = loc.split('/draft/')[1];
		draft = loc.split('#')[0];
		localStorage.setItem(String(draft), String(datesave))
	}
}
//Подписки
function subscribe(){
	if (oldsub.search(user) != -1){
		alert("Вы уже подписаны!");
	}
	else{
		if (confirm("Вы уверены, что хотите подписаться на новости пользователя " + user + "?")) {
			alert("Подписка оформлена!");
			i = parseInt(i);
			sub[i] = user;
			i += 1;
			oldsub = sub.join();
			localStorage.setItem('Subs', sub);
			localStorage.setItem('Sub_index', i);
		}
	}
	$('a[onclick="subscribe()"]').remove();
}

//Перевод строки в массив
function toArray(){
	var arr = [];
	arr = sub.split(',');
	oldsub = sub;
	sub = arr;
}
//Удалить подписку
function removeSub(s){
	if(confirm("Вы уверены, что хотите отписаться от новостей пользователя " + sub[s] + "?")){
		sub.splice(s, 1);
		i -= 1;
		localStorage.setItem('Subs', sub);
		localStorage.setItem('Sub_index', i);
		var usersub = sub[s];
		if(location.href == 'https://multator.ru/extension' || location.href == 'https://multator.ru/extension#'){
			$('a[id="' + s + '"]').remove();
			$('a[onclick="removeSub(' + s + ')"]').remove();
		}
		else{
			$('a[onclick="removeSub(' + s + ')"]').remove();
		}
	}
}
//Страница настроек
if(location.href == 'https://multator.ru/extension' || location.href == 'https://multator.ru/extension#'){
	$('#subs').append('<p style="font-size: 14px;">Вы подписаны на ' + i + ' пользователей:</p><br/>');
	while (s < i) {
		var usersub = sub[s];
		$('#subs').append('<p style="font-size: 14px;"><a href="/user/' + usersub + '" id="' + s + '" class="username ">' + usersub + '</a> <a href="#" onclick="removeSub(' + s + ')">[Отписаться]</a></p><br/>');
		s += 1;
	}
	$('#sub_sett').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb1" id="check1" value="" onclick="checkFlag()" />Выделять рамки мультов кумиров</label></p><br/>');
	$('#sub_sett').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb2" id="check2" value="" onclick="checkFlag2()" />Выделять ники кумиров на превью мультов</label></p><br/>');
	$('#sub_sett2').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb3" id="check3" value="" onclick="checkFlag3()" />... последние 4 мульта кумиров</label></p><br/>');
	$('#sub_sett2').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb4" id="check4" value="" onclick="checkFlag4()" />... последние 8 мультов кумиров</label></p><br/>');
	$('#sub_sett2').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb5" id="check5" value="" onclick="checkFlag5()" />... последние 12 мультов кумиров</label></p><br/>');
	$('#sub_sett3').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb6" id="check6" value="" onclick="checkFlag6()" />... никогда</p><br/>');
	$('#sub_sett3').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb7" id="check7" value="" onclick="checkFlag7()" />... каждые 10 секунд</label></p><br/>');
	$('#sub_sett3').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb8" id="check8" value="" onclick="checkFlag8()" />... каждые 30 секунд</label></p><br/>');
	$('#sub_sett3').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb9" id="check9" value="" onclick="checkFlag9()" />... каждые 60 секунд</label></p><br/>');
	$('#sub_sett3').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb10" id="check10" value="" onclick="checkFlag10()" />Показывать уведомления о непрочитанных собщениях</label></p><br/>');
	$('#sub_sett4').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb11" id="check11" value="" onclick="oldDesc()" />Старый шрифт описания</label></p><br/>');
	$('#sub_sett4').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb12" id="check12" value="" onclick="bigPreviewF()" />Большие превью мультов в комментариях и ЛС</label></p><br/>');
	$('#sub_sett4').append('<p style="font-size: 14px;"><label><input type="checkbox" name="cb13" id="check13" value="" onclick="animPreviewF()" />Анимированные превью в комментариях и ЛС</label></p><br/>');
}

//Настройки
//not('toon_preview large')
if(opt1 == "true"){
	if(location.href == 'https://multator.ru/my' || location.href == 'https://multator.ru/my/' || location.href == 'https://multator.ru/my#'){
	}
	else{
		while(f < i){
			author = $('div.toon_tagline a[href="/user/' + sub[f] + '"].username').parent().parent();
			//author.removeAttr('class');
			author.attr('style', 'width:208px;border:solid;border-color:#33aa00;border-width:1px;');
			f += 1;
		}
	}
}
function checkFlag(){
	if($('#check1').prop('checked')) {
		opt1 = "true";
		localStorage.setItem('Option_1', opt1);
	}
	else{
		opt1 = "false";
		localStorage.setItem('Option_2', opt2);
	}
}
if(opt1 == "true"){
	$('#check1').attr('checked', 'checked');
}

if(opt2 == "true"){
	while(f2 < i){
		kumir = $('div.toon_tagline a[href="/user/' + sub[f2] + '"].username');
		kumir.attr('style', 'color:#ff6600 !important');
		f2 += 1;
	}
}
function checkFlag2(){
	if($('#check2').prop('checked')) {
		opt2 = "true";
		localStorage.setItem('Option_2', opt2);
	}
	else{
		opt2 = "false";
		localStorage.setItem('Option_2', opt2);
	}
}
function checkNick(){
	if(opt2 == "true"){
		while(f2 < i){
			kumir = $('div.toon_tagline a[href="/user/' + sub[f2] + '"].username');
			kumir.attr('style', 'color:#ff6600 !important');
			f2 += 1;
		}
	}
}
if(opt2 == "true"){
	$('#check2').attr('checked', 'checked');
}
//Настройки показа подписок

function checkFlag3(){
	if($('#check3').prop('checked')) {
		max_sub = 4;
		localStorage.setItem('Sub_page', max_sub);
		$('#check4').removeAttr('checked');
		$('#check5').removeAttr('checked');
	}
}
if(max_sub == 4){
	$('#check3').attr('checked', 'checked');
	$('#check4').removeAttr('checked');
	$('#check5').removeAttr('checked');
}

function checkFlag4(){
	if($('#check4').prop('checked')) {
		max_sub = 8;
		localStorage.setItem('Sub_page', max_sub);
		$('#check3').removeAttr('checked');
		$('#check5').removeAttr('checked');
	}
}
if(max_sub == 8){
	$('#check4').attr('checked', 'checked');
	$('#check3').removeAttr('checked');
	$('#check5').removeAttr('checked');
}

function checkFlag5(){
	if($('#check5').prop('checked')) {
		max_sub = 12;
		localStorage.setItem('Sub_page', max_sub);
		$('#check3').removeAttr('checked');
		$('#check4').removeAttr('checked');
	}
}
if(max_sub == 12){
	$('#check5').attr('checked', 'checked');
	$('#check3').removeAttr('checked');
	$('#check4').removeAttr('checked');
}


//Настройки уведомлений

function checkFlag6(){
	if($('#check6').prop('checked')) {
		timer = "0";
		localStorage.setItem('timer', timer);
		$('#check7').removeAttr('checked');
		$('#check8').removeAttr('checked');
		$('#check9').removeAttr('checked');
	}
}
if(timer == "0"){
	$('#check6').attr('checked', 'checked');
	$('#check7').removeAttr('checked');
	$('#check8').removeAttr('checked');
	$('#check9').removeAttr('checked');
}

function checkFlag7(){
	if($('#check7').prop('checked')) {
		timer = "10000";
		localStorage.setItem('timer', timer);
		$('#check6').removeAttr('checked');
		$('#check8').removeAttr('checked');
		$('#check9').removeAttr('checked');
	}
}
if(timer == "10000"){
	$('#check7').attr('checked', 'checked');
	$('#check6').removeAttr('checked');
	$('#check8').removeAttr('checked');
	$('#check9').removeAttr('checked');
}

function checkFlag8(){
	if($('#check8').prop('checked')) {
		timer = "30000";
		localStorage.setItem('timer', timer);
		$('#check6').removeAttr('checked');
		$('#check7').removeAttr('checked');
		$('#check9').removeAttr('checked');
	}
}
if(timer == "30000"){
	$('#check8').attr('checked', 'checked');
	$('#check6').removeAttr('checked');
	$('#check7').removeAttr('checked');
	$('#check9').removeAttr('checked');
}


function checkFlag9(){
	if($('#check9').prop('checked')) {
		timer = "60000";
		localStorage.setItem('timer', timer);
		$('#check6').removeAttr('checked');
		$('#check7').removeAttr('checked');
		$('#check8').removeAttr('checked');
	}
}
if(timer == "60000"){
	$('#check9').attr('checked', 'checked');
	$('#check8').removeAttr('checked');
	$('#check7').removeAttr('checked');
	$('#check6').removeAttr('checked');
}
function bigPreviewF() {
	if($('#check12').prop('checked')) {
		localStorage.setItem('bigPreview', "on");
	}
	else {
		localStorage.setItem('bigPreview', "off");
	}
}
if (localStorage.getItem('bigPreview')=="on") {
		$('#check12').attr('checked', 'checked');
}
/*function animPreviewF() {
	if ($('#check13').prop('checked')) {
	localStorage.setItem('animPreview','off');
	}
	else {
		localStorage.setItem('animPreview','on');
	}
}
if (localStorage.getItem('animPreview')=='on') {
	$('#check13').attr('checked','checked');
}*/

function animPreviewF() {
	if($('#check13').prop('checked')) {
		localStorage.setItem('animPreview', "on");
	}
	else {
		localStorage.setItem('animPreview', "off");
	}
}
if (localStorage.getItem('animPreview')=="on") {
		$('#check13').attr('checked', 'checked');
}
function setChannel() {
  var channel = prompt('Введите код канала:','');
  var flashHref = draw30.attr('src').substring(0,equal+1);
  var drawHref = flashHref+channel;
  deleteCookie('PHPSESSID');
  var draw30 = $('embed[name="draw"]');
  draw30.attr('src',drawHref);
}
//Старое описание
function oldDesc() {
	if($('#check11').prop('checked')) {
		localStorage.setItem('oldDesc', "on");
	}
	else {
		localStorage.setItem('oldDesc', "off");
	}
}
if (localStorage.getItem('oldDesc')=="on") {
		$('#check11').attr('checked', 'checked');
}

/*function checkFlag2(){
	if($('#check2').prop('checked')) {
		opt2 = "true";
		localStorage.setItem('Option_2', opt2);
	}
	else{
		opt2 = "false";
		localStorage.setItem('Option_2', opt2);
	}
}*/
