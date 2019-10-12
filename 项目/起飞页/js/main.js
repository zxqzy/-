// section区域图片初始移动
(function () {
    let aSection = document.querySelectorAll("#main [class ^= 'section']");
    let aImg = document.querySelectorAll("#main [class ^= 'section'] div.image");
    let docHeight;
    let height = [];

    //页面滚动事件
    window.onscroll = function () {
        docHeight = document.documentElement.scrollTop;
        move(docHeight);
    };
    //页面加载事件
    window.onload = function () {
        docHeight = document.documentElement.scrollTop;
        move(docHeight);
    };
    //移动函数
    function move() {
        for (let i = 0; i < height.length; i++) {
            if (height[i] - docHeight < 400 && height[i] - docHeight > -400)
                aImg[i].style.transform = `translate(0px)`;
        }
    }
    //获取每个section元素的top值
    aSection.forEach(function (ele, index) {
        //获取元素的offsetTop
        height[index] = ele.offsetTop;
    });
}());

//免费模板区域轮播
(function () {
    //分别获取ul,li,和左右按钮对象
    let oTemplate = document.querySelector(".free-template .display ul"),
        aTemplateLi = document.querySelectorAll(".free-template .display ul li"),
        oLeftBtn = document.querySelector(".btn .left-btn"),
        oRightBtn = document.querySelector(".btn .right-btn");
    //设置一系列辅助变量
    let index = 0,
        widthLi,
        marginLi,
        clickTime = 0;
    //定义轮播时ul的变化量
    let variationUl;
    //动态获取li的宽度和margin值
    window.onresize = function fn() {
        let styleLi = getComputedStyle(aTemplateLi[0]);
        widthLi = parseFloat(styleLi.width);
        marginLi = parseFloat(styleLi.marginLeft);
        variationUl = widthLi + marginLi * 2;
        return fn;
    }();
    //给左按钮添加事件
    oLeftBtn.onclick = function () {
        if (new Date - clickTime < 800) return;
        clickTime = new Date;
        index--;
        index < 0 && (index = 0);
        oTemplate.style.marginLeft = -variationUl * index + 'px';
    };
    //给右按钮添加事件
    oRightBtn.onclick = function () {
        if (new Date - clickTime < 800) return;
        clickTime = new Date;
        index++;
        if (index > 3) index = 3;
        oTemplate.style.marginLeft = -variationUl * index + 'px';
    };
    //自动轮播
    setInterval(function () {
        index++;
        if (index > 3) index = 0;
        oTemplate.style.marginLeft = -variationUl * index + 'px';
    }, 4000);
})();