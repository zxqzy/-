class Slide {
    constructor(btnLeft, btnRight, goods, distance, len) {
        this.btnLeft = btnLeft;
        this.btnRight = btnRight;
        this.goods = goods;
        this.distance = distance;
        this.len = len;
        this.index = 0;
    }
    //左点击
    leftClick() {
        if ($(this).hasClass("disabled")) return;
        this.index--;
        if (this.index < 0) this.index = 0;
        this.btnState();
        this.move();
    }
    //右点击
    rightClick() {
        if ($(this).hasClass("disabled")) return;
        this.index++;
        if (this.index > this.len - 1) this.index = len-1;
        this.btnState();
        this.move();
    }
    //移动
    move() {
        this.goods.stop().animate({
            left: -this.distance * this.index + 'px'
        }, 500);
    }
    //控制按钮样式
    btnState() {
        this.btnLeft.removeClass("disabled");
        this.btnRight.removeClass("disabled");
        if (this.index === 0) this.btnLeft.addClass("disabled");
        if (this.index === this.len - 1) this.btnRight.addClass("disabled");
    }
}