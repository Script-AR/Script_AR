$.ajax({
    type: 'GET',
	url: 'http://flash.multator.ru/swf/'+'agketim5n9i5',
	async:false,
	context: document.body,
	crossDomain: true,
	success: function(data){
		//var flash = $(data);
        console.log(data);
	},
	error: function (x,stat,error) {
		console.error('Ошибка!: '+error+'  статус:  '+stat);
	}
});
