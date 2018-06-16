function Banner(src) {
    this.src = src;
    this.html = $('<article><img/></article>');
    this.html.find('img').attr('src', src);
    this.indicator = new Indicator();
}
Banner.prototype.append = function (target) {
    $(target).append(this.html);
    $(target).append(this.indicator.html);
};
Banner.prototype.fadeOutLeft = function () {
    this.html.css({
        "animation-name": "fadeOutLeft",
        "animation-duration": ".5s",
        "animation-fill-mode": "both"
    });
};
Banner.prototype.fadeOutRight = function () {
    this.html.css({
        "animation-name": "fadeOutRight",
        "animation-duration": ".5s",
        "animation-fill-mode": "both"
    });
};
Banner.prototype.fadeInRight = function () {
    this.html.css({
        "animation-name": "fadeInRight",
        "animation-duration": ".5s",
        "animation-fill-mode": "both"
    });
};
Banner.prototype.fadeInLeft = function () {
    this.html.css({
        "animation-name": "fadeInLeft",
        "animation-duration": ".5s",
        "animation-fill-mode": "both"
    });
};

function Indicator(){
    this.width = "20px";
    this.background_color = "#E8EAF6";
    this.html = $('<div class="banner-indicators box-shadow"><label></label></div>');
}
Indicator.prototype.select = function(check){
    if(check){
        this.width = "8px";
        this.background_color = "#283593";
    }
    else{
        this.width = "20px";
        this.background_color = "#E8EAF6";
    }
    this.html.css(
        {
            "width":this.width,
            "background-color":this.background_color
        }
    );
}