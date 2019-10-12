//导航下拉
(function () {
    //获取jQuery对象
    let $slide = $("#nav .nav-center li.slide"),
        $slideContent = $("#nav .slideContent"),
        $spinner = $("#nav .slideContent .spinner");
    //给导航元素添加事件
    $slide.hover(function () {
        //slideContent显示
        $slideContent.stop().slideDown(300);
        //内容显示
        $spinner
            .stop()
            .hide()
            .eq($(this).index())
            .show();
    }, function () {
        //slideContent隐藏
        $slideContent.stop().slideUp(300);
    });
    //移入slideContent，让内容不消失
    $slideContent.hover(function () {
        $(this).stop().slideDown(300);
    }, function () {
        $(this).stop().slideUp(300);
    });
}());

//轮播图
(function () {
    //获取jQuery对象
    let $banner = $("#banner"),
        $imgLi = $("#banner .banner-img li"),
        $btnPrev = $("#banner .btn-prev"),
        $btnNext = $("#banner .btn-next"),
        $btnBottom = $("#banner .btn-bottom li");

    let index = 0,
        len = $imgLi.length,
        timer = null,
        lastTime = 0;

    //变化函数
    function change(index) {
        $imgLi.stop().eq(index).fadeIn(500).siblings().fadeOut(500);
        $btnBottom.eq(index).addClass("active").siblings().removeClass("active");
    }
    //左按钮
    $btnPrev.click(function () {
        if (new Date - lastTime < 500) return;  //避免频繁点击
        lastTime = new Date;
        index--;
        if (index < 0) index = len - 1;
        change(index);
    });

    //右按钮
    $btnNext.click(function () {
        if (new Date - lastTime < 500) return;
        lastTime = new Date;
        index++;
        if (index > len - 1) index = 0;
        change(index);
    });

    //下方按钮
    $btnBottom.click(function () {
        index = $(this).index();
        change(index);
    });

    //设置自动变化函数
    function autoChange() {
        timer = setInterval(function () {
            index++;
            if (index > len - 1) index = 0;
            change(index);
        }, 2000);
    }
    autoChange();
    //给banner添加事件
    $banner.hover(() => { clearInterval(timer) }, autoChange);
})();

//小米闪购
(function () {
    //获得jQuery对象
    let $btnLeft = $("#flash-purchase .btn .btn-left"),
        $btnRight = $("#flash-purchase .btn .btn-right"),
        $goods = $("#flash-purchase .flash-main .flash-goods li"),
        distance = (237 + 8) * 4,
        len = Math.ceil($goods.length / 4);
    //创建slide对象
    let flashSlide = new Slide($btnLeft, $btnRight, $goods, distance, len);
    $btnLeft.click(function () {
        flashSlide.leftClick();
    });
    $btnRight.click(() => {
        flashSlide.rightClick();
    });
}());

//家电
(function () {
    //获取jQuery对象
    let $heada = $(".hea-area .hea-head h2 a"),
        $bodyUl = $(".hea-area .hea-body .right ul"),
        len = $heada.length;
    //给a标签添加事件
    $heada.mouseenter(function () {
        index = len - 1 - $(this).index();
        $bodyUl.stop().hide().eq(index).show();
        $(this).addClass("first").siblings().removeClass("first");
    });
}());

//内容
+function () {
    //获取jQuery对象
    let $bodyLi = $(".substance .sub-body>ul>li");

    //给每个大的展示框添加事件
    $bodyLi.each(function () {
        let $dotted = $(this).find(".dotted li");
        let $detailUl = $(this).children("ul");
        let $btnLeft = $(this).find(".btn-left");
        let $btnRight = $(this).find(".btn-right");
        let index = 0,
            len = $detailUl.find("li").length;
        //变化函数
        function change(index) {
            $detailUl.stop().animate({
                left: -index * 296 + 'px'
            }, 500);
            $dotted.eq(index).addClass("active").siblings().removeClass("active");
        }
        //初始给每个元素添加样式
        $dotted.eq(0).addClass("active");
        //点击事件
        $dotted.click(function () {
            index = $(this).index();
            change(index);
        });
        //左按钮
        $btnLeft.click(function () {
            index--;
            if (index < 0) index = 0;
            change(index);
        });
        //右按钮
        $btnRight.click(function () {
            index++;
            if (index > len - 1) index = len - 1;
            change(index);
        });
    });
}();

//回到顶部
(function () {
    //获取jQuery对象
    let $home = $("#sidebar .sidebar-small ul>li:last-child");
    let timer = null;

    isShow();
    function isShow() {
        let top = $(document).scrollTop();  //window
        if (top < 200) {
            $home.hide();
        } else {
            $home.show();
        }
    }

    //为了让滑动过程中不显示home键，可以采用定时器的方式
    $(document).scroll(function () {
        clearTimeout(timer);
        timer = setTimeout(isShow, 500);
    });

    $home.click(function () {
        //$(document).scrollTop(0);
        $("html,body").animate({
            scrollTop: 0
        }, 300);
    });
})();

//为你推荐
(function () {
    //获得jQuery对象
    let $btnLeft = $(".recommend .btn-left"),
        $btnRight = $(".recommend .btn-right"),
        $goods = $(".recommend .rec-body ul"),
        distance = (234 + 14) * 5,
        len = Math.ceil($goods.find("li").length / 5);
    //创建slide对象
    let flashSlide = new Slide($btnLeft, $btnRight, $goods, distance, len);
    $btnLeft.click(function () {
        flashSlide.leftClick();
    });
    $btnRight.click(() => {
        flashSlide.rightClick();
    });
}());