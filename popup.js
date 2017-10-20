var page = 1;
var pmax = 999;
//прелоадер
$('#preloader').attr('style', 'display:none');
//Загрузка панели
$.ajax({
		url: 'https://multator.ru/',
		dataType:"html",
		async:false,
		context: document.body.innerHTML,
		crossDomain: true,
		success: function(data){
			var data = $(data);
			data.find('a[class="menu"]').attr('style', 'color: #000000; text-decoration: none;');
			var username = data.find('a[class="menu"] span').text();	
			data.find('a[class="menu"]').removeAttr('href');
			data.find('a[class="menu"]').attr('href', 'https://multator.ru/user/' + username);
			data.find('a[class="menu"]').attr('target', '_blank');
			data.find('li[id="spiders"] a').removeAttr('href');
			data.find('li[id="spiders"] a').attr('href', 'https://multator.ru/spiders/');
			data.find('li[id="spiders"] a').attr('target', '_blank');
			data.find('li[id="mnumessages"] a').removeAttr('href');
			data.find('li[id="mnumessages"] a').attr('href', 'https://multator.ru/message/');
			data.find('li[id="mnumessages"] a').attr('target', '_blank');
			$('#toolbar').prepend(data.find('ul[id="newmenu"]'));
			$('#preloader').attr('style', 'display:none;');
			$('#news').removeAttr('style');
		}
});
/*Кнопка "Обновить"    
$('#refresh').bind('click', function(){
  	var username = $('a[class="menu"] span').text();
	$('#refresh').remove();
	$('#preloader').removeAttr('style');
	loadNewComments(username);
});
//Загрузка новых комментариев
function loadNewComments(user){
	$.ajax({
		url: 'https://multator.ru/user/' + user + '/owntoons/' + page + '/',
		dataType:"html",
		async:false,
		context: document.body,
		crossDomain: true,
		success: function(data){
			var data = $(data);  
			pmax = data.find('ul[class="paginator"] li').last().text();
			pmax = parseInt(pmax);
			while(page < pmax){
				$('#preloader_text').html('<h1>Загрузка... ' + page + ' из ' + pmax + '...</h1>');
				$('#news').append(data.find('span[class="red"]').parent().parent());
				page += 1;
				loadNewComments(user);
			}
		}
	});   
}
*/