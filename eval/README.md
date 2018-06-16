# KMUSW 종합정보 시스템 
    "본 사이트" 는 기존 종합시스템의 개정안이 아닌 SW과 만의 확장기능 버전입니다.
    
## Structure design

```
body    
│
└───main
    │  
    └───header
    │  
    └───nav
    │   │   
    │   │   section  
    │   │   section
    │   └───...
    │  
    └───section
    └───... 
    
```

## Change Log (중간 고사 이후)

* ### 기존 nav-section 부분들 animation-delay

    #### index.html
    ```html
    <section class="nav-section box-shadow fade-in animated delay3 ">    
    <section class="nav-section box-shadow fade-in animated delay6 ">    
    <section class="nav-section box-shadow fade-in animated delay9 ">    
    <section class="nav-section box-shadow fade-in animated delay12 ">  
    ...
    ```
    #### index.css
    ```css
    .delay3 {
        animation-delay: .3s;
    }

    .delay6 {
        animation-delay: .6s;
    }

    .delay9 {
        animation-delay: .9s;
    }

    .delay12 {
        animation-delay: 1.2s;
    }
    ...
    ```
    기존에 클래스를 각 딜레이에 맞춰서 따로따로 해주었다. 이 경우 이후 메뉴의 확장성을 고려 하면 index.html에 추가할 nav-section의 경우에 fade-in animated delay{num}을 추가해주어야하고 그에 맞는 딜레이를 가지는 css또한 추가해주어야 한다.
    
    이와 같은 이유로 확장성에 대해서 매우 불편 할 수 있기 때문에 다음과 같이 바꾸어 주었다.
    #### index.html
    ```html
    <head>
        ...
        <script src="static/index.js"/>
        ...
    </head>
    <body>
        ...
        <section class="nav-section box-shadow">    
        <section class="nav-section box-shadow">    
        <section class="nav-section box-shadow">    
        <section class="nav-section box-shadow">  
        ...
    </body>
    ```
    #### index.js
    ```javascript
    var delay = 300;
    $(document).ready(
        function(){
            var navMenus = $(".nav-wrapper").find('section');
            for(var i = 0; i<navMenus.length; ++i){
                var second = delay * i / 1000;
                $(navMenus[i]).css('animation-delay', second+'s');

                $(navMenus[i]).addClass('fade-in animated');

            }
        }
    );
    ```
    
    이 경우엔 html에만 nav-section(메뉴)를 추가하면 자동적으로 딜레이가 한번 더 되어 로딩 되게 된다.
    
* ### body background-image가 안의 요소들보다 늦게 로딩 되는 점

    #### 문제 분석 및 조사
        1. background-image 속성은 image load event handler가 없다.
        2. img 태그에는 image load event handler가 존재.
        3. 한번 로드된 이미지는 캐시에 저장되어있고, 다시 똑같은 이미지를 불러올 때, 이 캐시를 참조한다.

    #### 개선 방안
    
        1. jquery를 이용하여 가상의 img Tag를 이용하여 먼저 이미지를 로드한다.
        2. 이 가상의 img Tag 로드 이벤트 핸들러에 만들어둔 가상의 img를 메모리에서 지우기 위해 img Tag를 remove 한다.
        3. 로드 된 이미지는 웹브라우저의 캐시로 남아 있으므로 이상태에서 body의 background-image style로 삽입하면 바로 로딩이 되고, 이미지 로드 이벤트를 달아놨기 때문에 이후에 다른 요소들을 띄울 수 있다.

    #### index.js
    
    ```javascript
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

    ```
