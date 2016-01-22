/**
 * Created by Lumpychen on 16/1/11.
 */

(function(){

    for(var i=0;i<$('.tab-detail').length;i++) {


        $('#tab-select li').has('.pset').eq(i)[0].tabIndex=i;

        $('#tab-select li').has('.pset').eq(i).bind('click', function () {

            if ($(this).attr('class') != 'active') {


                $('.active').children('.pset').css('background', '#ffffff');
                $('.active').attr('class', '');
                $(this).attr('class', 'active');
                $(this).children('.pset').css('background', '#000000');
                //switch active

                for (var j= 0;j<$('.tab-detail').length;j++){
                    if($('.tab-detail').eq(j).css('display')!='none')
                    {
                        $('.tab-detail').eq(j).hide();
                    }
                }
                $('.tab-detail').eq($(this)[0].tabIndex).css('display','block');
                //switch tabs

            }
        })
    }

})();