function NavSection(element, targetWindow, width, height) {
    this.targetWindow = $(targetWindow);
    this.element = $(element);
    this.width = width;
    this.height = height;
    this.element.click({
        this: this
    }, this.fadeIn);
    this.targetWindow.click({
        this: this
    }, this.fadeOut);
}
NavSection.prototype.fadeIn = function (event) {
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).unbind('click');
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).click(function () {
        return false;
    });

    event.data.this.targetWindow.css(
        'z-index', '100'
    );
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).css({
        'top': "calc(50% - " + event.data.this.height / 2 + "px)",
    });
    event.data.this.targetWindow.animate({
            'opacity': '1',
        }, 250,
        function () {
            $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).animate({
                    'width': event.data.this.width + "px",
                    'height': event.data.this.height + "px",
                    'opacity': '1',

                }, 200,
                function () {
                    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).addClass('top-of-z-index');
                    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).find('*').animate(
                        {'opacity': '1'},
                        300,function(){}
                    ).delay(100);
                }
            );
        }
    );
};
NavSection.prototype.fadeOut = function (event) {
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).unbind('click');
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).find('*').css(
        'opacity', '0'
    );
    event.data.this.targetWindow.animate({
            'opacity': '0',
        }, 200,
        function () {
            event.data.this.targetWindow.css(
                'z-index', '0'
            );
        }
    );
    $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).animate({
            'opacity': '0',
            'width': '0',
            'height': '0',
        }, 150,
        function () {
            $(event.data.this.targetWindow.find('.wraper-floating-session')[0]).removeClass('top-of-z-index');
            
        }
    );

};
