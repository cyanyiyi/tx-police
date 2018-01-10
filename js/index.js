$(function () {
    FastClick.attach(document.body);
    var main = {};
    main.init = function () {
        if(document && document.getElementById && document.getElementsByTagName) {
            console.log('document');
        }
        main.page1();
        main.loadLine();
    }
    main.initSwipper = function () {
        main.mainSwiper = new Swiper('.swiper-container-main', {
            direction: 'vertical',
            onInit: function (opt) { //Swiper2.x的初始化是onFirstInit
            },
            onSlideChangeEnd: function (opt) {
                // console.log(opt.activeIndex);
                // if (opt.activeIndex === 1) {
                //     $('#video')[0].pause();
                // }
            }
        })
    }
    main.loadLine = function () {
        var wid = 0;
        main.timer = setInterval(function () {
            if (wid >= 170) {
                clearInterval(main.timer);
                main.tryNow();
                // main.page2();
            }
            $('.load-line-inner').width(wid);
            wid++
        }, 16)
    }
    main.page1 = function () {
        $('.page1').css('opacity', 1).show();
        $('.page2').show();
    }
    main.tryNow = function() {
        $('.load-line').hide();
        $('.try-now').show();
        var introVideo = $('#start-video')[0];
        $(document).on('click', '.try-now', function(){
            introVideo.load();
            introVideo.play();
            main.page2();
            setTimeout(function () {
                $('#start-video-jump').fadeIn();
            },4000)
        })
    }
    main.page2 = function () {
        $('.page1').hide();
        $('.page2').show();
        
        var introVideo = $('#start-video')[0];
        introVideo.addEventListener("ended", function () {
            $('.page2').hide();
            main.page3();
        })
        $(document).on('click', '#start-video-jump', function () {
            introVideo.pause();
            $('.page2').hide();
            main.page3();
        })
        // $(document).on('click', '#start-video-pic', function () {
        //     $(this).hide();
        //     introVideo.load();
        //     introVideo.play();
        //     setTimeout(function () {
        //         $('#start-video-jump').fadeIn();
        //     }, 2000)
        // })
    }
    main.page3 = function () {
        $('.page3').show();
        main.initSwipper();
        $.each($('.video-full'), function(k, v){
            v.addEventListener("ended", function () {
                $(v).parents('.video-full-container').hide();
            })
        })
        $(document).on('click', '.video-pic', function () {
            var index = $(this).index('.video-pic');
            $('.video-full-container').eq(index).show().find('.video-full')[0].play();
        })
        $(document).on('click', '.video-close', function () {
            $(this).siblings('.video-box').find('.video-full')[0].pause();
            $(this).parents('.video-full-container').hide();
        })
        $(document).on('click', '.slide3-line-btn', function () {
            window.location.href = 'https://cloud.tencent.com/act/event/wx-video.html'
        })
    }
    main.init();
})