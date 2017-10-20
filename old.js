//Старое описание
var oldDesc = localStorage.getItem('oldDesc');
var desc = $('#description_text_div');
if (oldDesc == 'on') {
  desc.removeAttr('class');
}
//Большие превью.
//вынимаем превью
var k = 0;
function bigPreview1() {
  var preview = $('.thumb:first');
  var bigPreviewVar = localStorage.getItem('bigPreview');
  if (bigPreviewVar == 'on') {
    preview.removeAttr('class');
  }
  k = k+1;
  var id_1 = 'qwerty'+ k;
  //alert(id_1);
  preview.attr('class',id_1);
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
