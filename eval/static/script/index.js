var delay = 300;
var server_domain = "https://beautiself.ga/";
var banners = new Array();
var temp;
var notCompleteSections = new Array();

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

        $.ajax({
            url: server_domain + 'api/banner',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.status) {
                    for (key in data.content) {
                        var banner = new Banner(data.content[key].image_url);
                        banner.append($(".nav-banner"));
                        banners.push(banner);
                    }
                    banners[0].html.css("left", 0);
                    banners[0].indicator.select(true);
                }
            },
            error: function (result) {
                alert(result);
            }
        });
        $('.left-button').click(bannerSlidLeft);
        $('.right-button').click(bannerSlidRight);
        var loginSection = new NavSection($('#nav-login'), $('#login-session'), 500, 400);
        var registerSection = new NavSection($('#nav-register'), $('#register-session'), 500, 400);

        notCompleteSections.push(new NavSection($("#nav-lecture"), $("#error-session"), 500, 230));
        notCompleteSections.push(new NavSection($("#nav-plan"), $("#error-session"), 500, 230));
        notCompleteSections.push(new NavSection($("#nav-cavi"), $("#error-session"), 500, 230));

        notCompleteSections[0].targetWindow.find("span").click({this:notCompleteSections[0]},
            function (event) {
                notCompleteSections[0].fadeOut(event);
                return false;
            }
        );
        loginSection.targetWindow.find("[type='submit']").click(function () {

            $.ajax({
                url: server_domain + 'api/login',
                type: 'post',
                data: $(loginSection.targetWindow.find("form")[0]).serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.status) {
                        var multiline = $(' <footer><div class="multiline"></div> </footer>');
                        for (var key in data.content) {
                            if (key == 'vaildiate' || key == 'id' || key == 'passwd')
                                continue;

                            multiline.children().append(key + ": " + data.content[key] + "<br/>");
                        }
                        loginSection.element.html(multiline);
                        loginSection.targetWindow.fadeOut();
                    }
                },
                error: function (result) {
                    alert(result.responseJSON.content);
                }
            });
        });
        registerSection.targetWindow.find("[type='submit']").click(function () {

            $.ajax({
                url: server_domain + 'api/register',
                type: 'post',
                data: $(registerSection.targetWindow.find("form")[0]).serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.status) {
                        alert("회원가입 완료!");
                        registerSection.targetWindow.fadeOut();

                    }
                },
                error: function (result) {
                    alert(result.responseJSON.content);
                }
            });
        });

    }
);
//function
function bannerSlidLeft() {

    var next_banner = banners.pop();
    var current_banner = banners[0];

    next_banner.indicator.select(true);
    current_banner.indicator.select(false);

    next_banner.fadeInRight();
    current_banner.fadeOutLeft();

    banners.unshift(next_banner);

}

function bannerSlidRight() {

    var current_banner = banners.shift();
    var next_banner = banners[0];

    current_banner.indicator.select(false);
    next_banner.indicator.select(true);

    current_banner.fadeOutRight();
    next_banner.fadeInLeft();

    banners.push(current_banner);

}
