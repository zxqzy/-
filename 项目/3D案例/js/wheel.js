/*
    @params
        * dom对象
        * 事件函数，第一个形参代表方位

    @return
        * undefined
*/
function mouseWheel(ele,eFn){
    if(document.createElement("div").onmousewheel === null){
        ele.addEventListener("mousewheel",function(e){
            e.preventDefault();
            eFn(Math.floor(e.wheelDelta/120));
        });
    }else{
        ele.addEventListener("DOMMouseScroll",function(e){
            e.preventDefault();
            eFn(-e.detail/3);  //火狐记录滚轮的值和标准浏览器是相反的
        });
    }
}