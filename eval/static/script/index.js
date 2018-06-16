let delay = 300;
$(document).ready(

    function () {
        $('<img/>').attr('src', 'static/ktis-background.png').on('load', function () {
            $(this).remove(); // prevent memory leaks as @benweet suggested
            $('body').css('background-image', 'url(static/ktis-background.png)');
            
            var navMenus = $(".nav-wrapper").find('section');
            console.log(navMenus);
            for (var i = 0; i < navMenus.length; ++i) {
                let second = delay * i / 1000;
                $(navMenus[i]).css(
                    {
                        'animation-delay': second + 's',
                        'display':'inline-block'
                    });
                $(navMenus[i]).addClass('fade-in animated');

            }
        });
    }
);
