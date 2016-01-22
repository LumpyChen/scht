/**
 * Created by Lumpychen on 16/1/12.
 */
(function() {

    if ($(window).height() > $(document.body).height()) {
        $('.banner-caption-foot').css('position', 'absolute');
        $('.banner-caption-foot').css('bottom', 0);
        $('html').css('height', '100%');
        $(document.body).css('height', '100%');
    }

    else {
        $('.banner-caption-foot').css('position', 'fixed');
        $('.banner-caption-foot').css('bottom', 0);
    }

    $(window).resize(function(){
        if ($(window).height() > $(document.body).height()) {
            $('.banner-caption-foot').css('position', 'absolute');
            $('.banner-caption-foot').css('bottom', 0);
            $('html').css('height', '100%');
            $(document.body).css('height', '100%');
        } else {
            $('.banner-caption-foot').css('position', 'fixed');
            $('.banner-caption-foot').css('bottom', 0);
        }
    })

})();