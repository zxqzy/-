+function () {

    //定义全局变量
    let num = 5 * 5 * 5;
    let oUl = document.querySelector('#main ul.list');
    let aLi = oUl.children;
    let oAll = document.querySelector('#all');
    let oAlert = document.getElementById('alert');

    //动态生成125个li并添加事件
    (function () {
        let fragment = document.createDocumentFragment();
        let oTopic = document.querySelector('#alert .title span');
        let oImg = document.querySelector('#alert .img img');
        let oTeacher = document.querySelector('#alert .teacher span');
        let oInfo = document.querySelector('#alert .info span');
        let oIframe = document.querySelector('#iframe iframe');

        for (let index = 0; index < num; index++) {
            let trX = Math.random() * 5000 - 2500;
            let trY = Math.random() * 5000 - 2500;
            let trZ = Math.random() * 5000 - 2500;

            //获取显示数据
            let oData = data[index] || {
                title: "H5",
                author: "xiaoxiao",
                time: "2019-8-20",
                topic: "更新中……",
                teacher: "未知😊😊😊",
                img: "demo/寻找.jpg",
                des: "案例还在持续寻找中……",
                link: ""
            };
            // 创建li变更设置li的样式
            let oLi = document.createElement("li");
            oLi.style.transform = `translate3D(${trX}px,${trY}px,${trZ}px)`;
            oLi.innerHTML = `<p class = "title">${oData.title}</p>
            <p class = "auto">${oData.author}</p>
            <p class = "time">${oData.time}</p>`;

            //给每个li添加点击事件
            oLi.onclick = function (e) {
                e.stopPropagation();
                //动态给弹框添加值
                oTopic.innerText = `课题：${oData.topic}`;
                oImg.src = `${oData.img}`;
                oTeacher.innerText = `完成人：${oData.teacher}`;
                oInfo.innerText = `描述：${oData.des}`;

                oAlert.style.transition = "0s";
                oAlert.style.opacity = "1";
                oAlert.style.transform = "scale(2)";
                //页面重绘
                oAlert.offsetLeft;
                oAlert.style.transition = ".3s";
                oAlert.style.transform = "scale(1)";

                //给每个弹框添加事件
                oAlert.onclick = function (e) {
                    e.stopPropagation();   //避免触发document的点击事件
                    let link = oData.link;
                    if (!link) return;
                    oIframe.src = link;
                    oAll.classList.add("right");
                }
            };
            fragment.appendChild(oLi);   //使用文档碎片进行优化
        }
        //将li添加入文档
        oUl.appendChild(fragment);
        oUl.offsetLeft;
        oUl.className = "list Table";
    })();

    //提前载入css样式
    (function () {
        let oCss = document.getElementById('css');
        let css = "";

        //获取球体形状每个元素的层级，和在每个层的位置
        function getLayer(arr, index) {
            let sum = 0;
            let result = {};
            for (let j = 0; j < arr.length; j++) {
                sum += arr[j];
                if (sum > index) {
                    result.file = j;
                    result.num = arr[j] - (sum - index);
                    return result;
                }
            }
        }

        //循环给每个li添加样式
        [...aLi].forEach(function (ele, index) {
            //Grid
            (function ({ jX, jY, jZ, midX, midY, midZ }) {
                let x = index % 25 % 5;
                let y = Math.floor(index % 25 / 5);
                let z = Math.floor(index / 25);
                //li以(2,2,2)的坐标为基点进行平移
                let trX = (x - midX) * jX;
                let trY = (y - midY) * jY;
                let trZ = (midZ - z) * jZ;
                css += `#main ul.list.Grid li:nth-child(${index + 1}){
                        transform:translate3D(${trX}px,${trY}px,${trZ}px) !important;
                    }`;
            })({
                jX: 260,
                jY: 240,
                jZ: 800,
                midX: 2,
                midY: 2,
                midZ: 2
            });
            //Helix
            (function ({ turns, trZ }) {
                let roY = index * turns * 360 / num;  //每一个旋转的角度
                let trY = (index - 125 / 2) * (turns-2)*3;
                css += `#main ul.list.Helix li:nth-child(${index + 1}){
                        transform:rotateY(${roY}deg) translateZ(${trZ}px) translateY(${trY}px) !important;
                    }`;
            })({ turns: 5, trZ: 800 });
            //Table
            (function ({ jX, jY, coordinate }) {
                //找到中心点
                let midX = 18 / 2 - 0.5;
                let midY = Math.floor(125 / 18 / 2) + 1.5;

                let x = index < 18 ? coordinate[index].x : index % 18;
                let y = index < 18 ? coordinate[index].y : Math.floor(index / 18) + 2;
                let tX = (x - midX) * jX;
                let tY = (y - midY) * jY;
                css += `#main ul.list.Table li:nth-child(${index + 1}){
                        transform:translate3D(${tX}px,${tY}px,0px) !important;
                    }`;
            })({
                jX: 180,
                jY: 220,
                coordinate: [
                    { x: 0, y: 0 },
                    { x: 17, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 12, y: 1 },
                    { x: 13, y: 1 },
                    { x: 14, y: 1 },
                    { x: 15, y: 1 },
                    { x: 16, y: 1 },
                    { x: 17, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 2 },
                    { x: 12, y: 2 },
                    { x: 13, y: 2 },
                    { x: 14, y: 2 },
                    { x: 15, y: 2 },
                    { x: 16, y: 2 },
                    { x: 17, y: 2 },
                ]
            });
            //Sphere
            (function (arr) {
                //分别求出每个元素在球体中的层数和在每层中的位置

                let { file, num } = getLayer(arr, index);

                //分别获取每个元素绕X和Y轴的旋转角度
                let roX = 90 - (180 / (arr.length - 1)) * file;
                let roY = 360 / arr[file] * num + file * 8;
                let trZ = 800;
                css += `#main ul.list.Sphere li:nth-child(${index + 1}){transform:rotateY(${roY}deg) rotateX(${roX}deg) translateZ(${trZ}px) !important;}`;
            })([1, 3, 7, 9, 11, 14, 21, 16, 12, 10, 9, 7, 4, 1]);
            oCss.innerHTML = css;
        });
    })();

    //鼠标拖拽事件和滚轮事件（改变元素的大小或旋转角度）
    (function () {
        let cX, cY, lastX, lastY, x_ = 0, y_ = 0;  //（x,y若初始不设值，会导致点击文档后，无法拖拽元素）
        let timer = null;
        let tX = 0,
            tY = 0,
            tZ = -2600;
        //鼠标按下
        document.onmousedown = function (e) {
            //判断弹窗的显示情况，若为显示状态，则不执行
            if (oAlert.style.opacity === "1") return;

            //停止还没有执行完成的惯性动画
            cancelAnimationFrame(timer);

            //记录元素初始的clientX、clientY
            lastX = e.clientX;
            lastY = e.clientY;
            //鼠标移动
            this.onmousemove = function (e) {
                //记录当前的clientX,clientY
                cX = e.clientX;
                cY = e.clientY;
                //得到两次的差值
                x_ = cX - lastX;
                y_ = cY - lastY;
                //重新修改元素的样式
                tX -= y_ * 0.15;
                tY += x_ * 0.15;
                oUl.style.transform = `translateZ(${tZ}px) rotateX(${tX}deg ) rotateY(${tY}deg)`;
                //重新修改lastX和lastY的值
                lastX = cX;
                lastY = cY;
            };
        };
        //鼠标抬起
        document.onmouseup = function () {
            this.onmousemove = null;
            //鼠标惯性
            !function m() {
                x_ = x_ * 0.95;
                y_ = y_ * 0.95;
                Math.abs(x_) <= 0.5 && (x_ = 0);
                Math.abs(y_) <= 0.5 && (y_ = 0);
                tX -= y_ * 0.1;
                tY += x_ * 0.1;
                if (!x_ && !y_) return;
                //重新修改元素的样式
                oUl.style.transform = `translateZ(${tZ}px) rotateX(${tX}deg ) rotateY(${tY}deg)`;
                timer = requestAnimationFrame(m);
            }();
        };
        //滚轮事件
        mouseWheel(document, function (d) {
            //判断弹窗的显示情况，若为显示状态，则不执行
            if (oAlert.style.opacity === "1") return;

            tZ += d * 150;
            tZ = Math.min(2000, tZ);
            tZ = Math.max(-10000, tZ);
            //重新修改元素的样式
            oUl.style.transform = `translateZ(${tZ}px) rotateX(${tX}deg ) rotateY(${tY}deg)`;
        });
    }());

    //文档点击和返回按钮点击
    (function () {
        let oBack = document.querySelector('#back');

        // 文档点击
        document.onclick = function () {
            if (oAlert.style.opacity === "0") return;
            oAlert.style.transition = ".8s";
            oAlert.style.opacity = "0";
            oAlert.style.transform = `scale(0) rotateY(210deg)`;
        };

        //返回按钮点击
        oBack.onclick = function () {
            oAll.classList.remove("right");
        };
    })();

    //下方按钮点击事件
    (function () {
        let bottomLi = document.querySelectorAll('#btn li');
        let fnArr = ["Table", "Sphere", "Helix", "Grid"];
        bottomLi.forEach((ele, index) => {
            //ele.onclick = switchShape[fnArr[index]];
            ele.onclick = function () {
                oUl.className = "list " + fnArr[index];
            }
        });
    })();
}();

//因为每个形状的样式不变的，因此没必要每次改变形状都重新计算一次每个元素的位置，
// 因此可以事先加载css样式，对代码进行优化
//定义变换形状的函数
/* let switchShape = {
    Grid() {
        let jX = 260,
            jY = 240,
            jZ = 800;

        let midX = 2,
            midY = 2,
            midZ = 2;

        [...aLi].forEach(function (ele, index) {
            let x = index % 25 % 5;
            let y = Math.floor(index % 25 / 5);
            let z = Math.floor(index / 25);
            //li以(2,2,2)的坐标为基点进行平移
            let trX = (x - midX) * jX;
            let trY = (y - midY) * jY;
            let trZ = (z - midZ) * jZ;
            ele.style.transform = `translate3D(${trX}px,${trY}px,${trZ}px)`;
        });
    },
    Helix() {
        let turns = 5;
        [...aLi].forEach(function (ele, index) {
            //let roY = index*360/30;
            let roY = index * turns * 360 / num;
            let trZ = 800;
            let trY = (index - 125 / 2) * (turns - 1) * 2;
            ele.style.transform = `rotateY(${roY}deg) translateZ(${trZ}px) translateY(${trY}px)`;
        });
    },
    Table() {
        //设置水平间距
        let jX = 180,
            jY = 220;
        //找到中心点
        let midX = 18 / 2 - 0.5;
        let midY = Math.floor(125 / 18 / 2) + 1.5;

        //定义前三行不规则的坐标
        let coordinate = [
            { x: 0, y: 0 },
            { x: 17, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 12, y: 1 },
            { x: 13, y: 1 },
            { x: 14, y: 1 },
            { x: 15, y: 1 },
            { x: 16, y: 1 },
            { x: 17, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 12, y: 2 },
            { x: 13, y: 2 },
            { x: 14, y: 2 },
            { x: 15, y: 2 },
            { x: 16, y: 2 },
            { x: 17, y: 2 },
        ];

        //循环移动元素
        [...aLi].forEach(function (ele, index) {
            let x = index < 18 ? coordinate[index].x : index % 18;
            let y = index < 18 ? coordinate[index].y : Math.floor(index / 18) + 2;
            let tX = (x - midX) * jX;
            let tY = (y - midY) * jY;
            ele.style.transform = `translate3D(${tX}px,${tY}px,0px)`;
        });
    },
    Sphere() {
        let arr = [1, 3, 7, 9, 11, 14, 21, 16, 12, 10, 9, 7, 4, 1];
        [...aLi].forEach(function (ele, index) {

            //分别求出每个元素在球体中的层数和在每层中的位置

            let { file, num } = getLayer(arr, index);

            //分别获取每个元素绕X和Y轴的旋转角度
            let roX = 90 - (180 / (arr.length - 1)) * file;
            let roY = 360 / arr[file] * num + file * 4;
            let trZ = 800;
            ele.style.transform = `rotateY(${roY}deg) rotateX(${roX}deg) translateZ(${trZ}px)`;
        });
    }
}; */