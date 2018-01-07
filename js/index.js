var main = {};
main.init = function () {
    // main.initSwipper();
    // main.page3();
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
main.loadLine = function() {
    var wid = 0;
    main.timer = setInterval(function(){
        if(wid>=170) {
            clearInterval(main.timer);
            main.page2();
        }
        $('.load-line-inner').width(wid);
        wid++
    }, 30)
}
main.page2 = function () {
    $('.page1').hide();
    $('.page2').show();
    setTimeout(function(){
        $('#start-video-jump').fadeIn();
    }, 2000)
    var introVideo = $('#start-video')[0];
    var playVideo = true;
    introVideo.addEventListener('canplaythrough',function(){
        if(playVideo) {
            introVideo.play();
        }
    });
    introVideo.play();
    introVideo.addEventListener("ended",function(){
        $('.page2').hide();
        main.page3();
    })
    $(document).on('click', '#start-video-jump', function () {
        introVideo.pause();
        playVideo = false;
        $('.page2').hide();
        main.page3();
    })
}
main.page3 = function() {
    $('.page3').show();
    main.initSwipper();
    // main.mainSwiper.init();
    $(document).on('click', '.video-pic', function(){
        var index = $(this).index('.video-pic');
        $('.video-full-container').eq(index).show().find('.video-full')[0].play();
        $(document).on('click', '.video-close', function() {
            $(this).siblings('.video-full')[0].pause();
            $(this).parent().hide();
        })
    })
    $(document).on('click', '.slide3-line-btn', function(){
        window.location.href = 'https://cloud.tencent.com/act/event/wx-video.html'
    })
}
main.init()