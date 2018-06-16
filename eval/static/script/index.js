let delay = 300;
$(document).ready(
    function(){
        var navMenus = $(".nav-wrapper").find('section');
        for(var i = 0; i<navMenus.length; ++i){
            let second = delay * i / 1000;
            $(navMenus[i]).css('animation-delay', second+'s');
            
            $(navMenus[i]).addClass('fade-in animated');
            
        }
    }
);