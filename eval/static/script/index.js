var delay = 300;
$(document).ready(

    function () {
        $('<img/>').attr('src', 'static/ktis-background.png').on('load', function () {
            $(this).remove(); // prevent memory leaks as @benweet suggested
            $('body')
                .css('background-image', 'url(static/ktis-background.png)');
            $('body').fadeIn(1500, function () {
                    var navMenus = $(".nav-wrapper").find('section');
                    for (var i = 0; i < navMenus.length; ++i) {
                        var second = delay * i / 1000;
                        $(navMenus[i]).css({
                            'animation-delay': second + 's',
                            'display': 'inline-block'
                        });
                        $(navMenus[i]).addClass('fade-in animated');

                    }
                });

        });
    }
);
