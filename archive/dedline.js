/* Все что связано с дедлайном. Я лично не считаю эту функцию полезной - если истечёт дедлайн
у автора только появится мотив отключить расширение. Если будет решено добавить в 2.0 (1.7) - нуждается
в доработке, а именно - проверка даты. Что довольно сложно, и мне влом это делать. */

function setDL(){
	if(confirm('Вы уверены? По истечению дедлайна черновик нельзя будет продолжить!')){
		datesave = document.getElementById("date").value;
		loc = String(location.href);
		draft = loc.split('/draft/')[1];
		draft = loc.split('#')[0];
		localStorage.setItem(String(draft), String(datesave))
	}
}
function checkDL(){
	var dates = document.getElementById("date").value; //получаем значение текстового поля с датой
	dates = dates.split('.'); //преобразуем в массив
	if(dates.length < 3 || dates.length > 3){ //проверяем количество элементов в массиве
		alert('Неверный формат даты! Дата должна быть дата формата 25.10.1917');
	}
	else if (dates[0].) {

	}
	else{ //если количество элементов равно 3, то есть если дата верного формата, проверяем дальше.
		setDL();
	}
}
function addDL(){
	$('.buttons').append('<p>Установите дату формата 31.12.2017</p><div id="datepicker"><input id="date"></input><input class="green" type="submit" onClick="checkDL()" value="Готово"></input></div>');
	$('a[onclick="addDL()"]').remove();
}
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

//ранг для МЕНЯЯЯЯЯ!!!
