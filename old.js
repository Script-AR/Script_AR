//Если включена одна из настроек, добавляет айди для успешной работы функций
if (sett[6] == 'true' || sett[7] == 'true') {
    var preview = document.querySelector('img.thumb');
    for (var i = 0; i < preview.length; i++) {
        var id = 'scriptar'+i;
        preview[i].setAttribute('id',id);
    }
}
//Старое описание
if (sett[5] == 'true') {
    var desc = $('#description_text_div');
    desc.removeAttr('class');
}
//Большие превью.
//вынимаем превью
var k = 0;
function bigPreview1() {
  var preview = $('.thumb:first');
  if (sett[6] == 'true') {
    preview.removeAttr('class');
  }
  k = k+1;
  var id = 'qwerty'+ k;
  preview.attr('class',id);
}

window.setInterval(bigPreview1,1);
//Анимирвоанное превью.
var animPreview = localStorage.getItem('animPreview');
function animateP100() {
  for (var i = 0; i < k; i++) {
    var id_2 = '.qwerty'+i;
    var preview = $(id_2);
    if (animPreview == 'on') {
      var imgSrc = preview.attr('src');
     if (imgSrc) {
      if (imgSrc.search(/preview/)==-1) {
        var imgSrc2 = imgSrc.replace('p100','preview');
        preview.attr('src',imgSrc2);
        //alert(imgSrc);
      }
     }
    }
  }
}

window.setInterval(animateP100,1);
