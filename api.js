var firstUser = ['tim', 'Bomboscha', 'Maks_Malewish', 'Bombosha', '0000', 'sadsanta', 'Diiir','Robot2014','-Tanos-','FbIB-'];
var lastUser = ['tim', 'Bomboscha', 'Акроним', 'Bombosha', 'Нулик', 'sasdanta', 'Diiir','Robot2014','Sonett','ФЫВ'];
var ranksName = ['Папка Мух, и по совместительству создатель этого расширения', 'Тапка Мух', 'Нелетающая булка', 'Гадкий тролль', 'ФЫВФЫВФЫВ', 'Пингвинчик-Админчик', 'Второй админчик, сломался',,'Со старта со Script_ARта'];
var statussName = ['username ', 'username red moderator', 'username anonymous', 'username ', 'username ', 'username moderator', 'username moderator','username red','username ','username'];
function startInit() {
	var author;
	var i = 0;
	var myname = firstUser.join('');
	for(var i = 0;i < firstUser.length;i++){
		author = $('a[href="/user/' + firstUser[i] + '"].username');
		author.removeAttr('class');
		author.attr('class', statussName[i]);
                author.html(lastUser[i]);
                author.removeAttr('style');

		authors = $('a[href="/message/' + firstUser[i] + '"].username');
		authors.removeAttr('class');
		authors.attr('class', statussName[i]);
                authors.removeAttr('style');
                authors.html(lastUser[i]);
		if(location.href.search('/user/' + firstUser[i]) != -1){
                        if(location.href.length == 25 + firstUser[i].length){
			       changeRank(i);
                        }
		}

	}
}
function changeRank(index) {
	var rank = $('div.userprofile .content_right b');
	rank.html(ranksName[index]);
}
if(localStorage.getItem('testMode')=='true'){
    window.setInterval(startInit,1);
}
$('button[onclick="return m.postComment()"]').click(function() {
 window.setInterval(startInit,1);
});
$('button[onclick="return m.postMessage()"]').click(function() {
 window.setInterval(startInit,1);
});
$('ul[class="paginator"]').click(function() {
 window.setInterval(startInit,1);
});

if(false){
$('.content_left').prepend(`<span class="red">Те кто это читает, отзовитесь мне в ЛС по ссылке наверху. Мне это нужно для статистики</span>`);}
$('.content_left').prepend(`<!---Ребзя короче я допилил интерактивность вроде как, но для этого мне пришлось установить запрет на кеширование.<br/>Для того что-бы он установился, надо почистить кеш. Те, кто это читают его уже почистили видимо.--->`);
if(localStorage.getItem('Cashe')=='true')$('meta').before('<meta http-equiv="pragma" content="no-cache">');
//$('body').attr('style', 'background: #F0FFFF;');
//всё, что дальше - это считалка паучков
/*$('head').append(`
<script>
var mayak = 0;
var manyak = 1;
var countar = 0;
function startSpiders(id){
	$('.findSpiders').remove();
    $('.spooder').remove();
	$('.imSpider').after('<h1 class="fiv" style="display:inline-block;">Подождите...</h1>');
	var fond = prompt('Введите призовой фонд', 300);
	if(!fond){
		fond = 300;
	}
	setTimeout(function(){FindSpiders(id, fond);},1000)
}
function FindSpiders(id, fond){
	$.ajax({
		url: '/event/' + id,
		dataType:"html",
		async:false,
		context: document.body,
		crossDomain: true,
		success: function(data){
			var data = $(data);
			var last = data.find('div.paginator li').last().text();
			last = parseInt(last);
			var counter = data.find('.toon_preview').length;
			if(last == 1){
				while(mayak < counter){
					var multikpultik = data.find('div.toon_preview:eq(' + mayak + ') .toon_image a').attr('href');
					multikpultik = multikpultik.split('/toon/')[1];
					getLikes(multikpultik);
					mayak++;
				}
			}
			else{
				while(manyak < last){
					while(mayak < counter){
						var multikpultik = data.find('div.toon_preview:eq(' + mayak + ') .toon_image a').attr('href');
						multikpultik = multikpultik.split('/toon/')[1];
						getLikes(multikpultik);
						mayak++;
					}
					manyak++;
				}
			}
			var moilaiki = $('span[id="like_value"]').text();
			moilaiki = parseInt(moilaiki);
			countar += moilaiki;
			var itog = fond * moilaiki / countar;
			itog = Math.floor(itog);
			$('.fiv').remove();
			$('.imSpider').after('  <h1 style="display:inline-block">~' + itog + '</h1>');
			var cartoontoontoon = location.href.split('/toon/')[1]
			cartoontoontoon = cartoontoontoon.replace('#', '');
			localStorage.setItem(cartoontoontoon, itog);
		}
	});
}

function getLikes(toonid) {
	$.ajax({
		url: '/toon/' + toonid,
		dataType:"html",
		async:false,
		context: document.body,
		crossDomain: true,
		success: function(data){
			var data = $(data);
			var bulbulbul = data.find('span[id="like_value"]').text();
			bulbulbul = parseInt(bulbulbul);
			if(bulbulbul == 0){
				bulbulbul = 1;
			}
			countar += bulbulbul;
		}
	});
}
</script>`);
if(location.href.search('toon') != -1){
	var topic = $('div.toon_prize_1 a').attr('href');
	topic = topic.split('/event/')[1];
	var toon = location.href.split('/toon/')[1];
	toon = toon.replace('#', '');
	var mySpider = localStorage.getItem(toon);
	if(!mySpider){
		$('.toon_prize_1 ').after('<img class="imSpider" src="/img/spider.png" /> <a href="#" class="findSpiders" style="color: black" onclick="startSpiders(' + "'" + topic + "'" + ');"><h1 style="display: inline-block">Сколько паучков дадут?</h1></a>');
	}
	else{
		$('.toon_prize_1 ').after('<img class="imSpider" src="/img/spider.png" /><h1 class="spooder" style="display:inline-block;">~' + mySpider + ' <a href="#" class="findSpiders" style="color: black" onclick="startSpiders(' + "'" + topic + "'" + ');">Обновить?</a></h1>');
	}
}*/
