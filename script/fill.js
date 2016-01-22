$(function(){
    $('table').visualize({type: 'line', width: '600px'});
    $('table td')
        .click(function(){
            if( !$(this).is('.input') ){
                $(this).addClass('input')
                    .html('<input type="text" value="'+ $(this).text() +'" />')
                    .find('input').focus()
                    .blur(function(){
                        //remove td class, remove input
                        $(this).parent().removeClass('input').html($(this).val() || 0);
                        //update charts
                        $('.visualize').trigger('visualizeRefresh');
                    });
            }
        })
        .hover(function(){ $(this).addClass('hover'); },function(){ $(this).removeClass('hover'); });
});