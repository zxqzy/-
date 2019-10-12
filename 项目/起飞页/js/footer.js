// 公司评价部分的轮播效果
(function () {
    //获取评价核心部分的Ul、li、左右按钮和下方tab
    let oDetailUl = document.querySelector(".company-assess .assess-detail>ul"),
        oDetailLi = document.querySelectorAll(".company-assess .assess-detail>ul>li"),
        oLeftBtn = document.querySelector(".company-assess .btn .left-btn"),
        oRightBtn = document.querySelector(".company-assess .btn .right-btn"),
        oTab = document.querySelectorAll(".company-assess .assess-detail .tab span");

    //定义辅助变量
    let index = 0,
        liWidth,
        len = oTab.length;

    //实时获取li的宽度
    window.onresize = function fn() {
        let liStyle = getComputedStyle(oDetailLi[0]);
        liWidth = parseFloat(liStyle.width);
        oDetailUl.style.marginLeft = -liWidth + 'px';
        return fn;
    }();
    
    //改变初始状态元素的marginLeft值
    (function() {
        oDetailUl.style.marginLeft = -liWidth + 'px';
    })();

    //定义一个变化函数
    function changeUl(index){
        for (let index = 0; index < len; index++) {
            oTab[index].classList.remove("show");
        }
        oDetailUl.offsetLeft;
        oDetailUl.style.transition = ".5s";
        oTab[index].classList.add("show");
        oDetailUl.style.marginLeft = -(index+1) * liWidth + 'px';
    }

    //给左按钮添加事件
    oLeftBtn.onclick = function () {
        index--;
        oDetailUl.style.transition = "0s";
        if(index<0){
            index = 4;
            oDetailUl.style.marginLeft = -index * liWidth + 'px';
            index=len-1;
        }
        changeUl(index);
    };

    //给右按钮添加事件
    oRightBtn.onclick = function () {
        oDetailUl.style.transition = "0s";
        index++;
        if(index >len-1){
            index = 0;
            oDetailUl.style.marginLeft = -index * liWidth + 'px';
        }
        changeUl(index);
    };

    //给下方的tab添加事件
    oTab.forEach(function(ele,ind){
        ele.onclick = function(){
            index = ind;
            changeUl(index);
        };
    });

    //阻止左右按钮的文字选中
    oLeftBtn.onselectstart = function(e){
        e.preventDefault();
    };
    oRightBtn.onselectstart = function(e){
        e.preventDefault();
    };
})();