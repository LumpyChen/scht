/**
 * Created by Lumpychen on 16/1/28.
 */
for (var i = 0; i<$('.label').length ;i++)
{
    var IH = $('.label').eq(i).innerHTML.toString();
    $('.label').eq(i).innerHTML = IH.slice(0,5);
}