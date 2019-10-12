// //点击菜单按钮显示左侧菜单
// (function () {
//     let oCon = document.getElementById("container");
//     let oLeftMenu = document.getElementById("left-menu");
//     let oKey = document.querySelector("#header .menu i");
//     let oSpan = document.querySelectorAll(".menu-detail span");
//     let oHidden = document.querySelectorAll(".menu-detail .hidden");

//     //获取可视区的高度
//     let oHeight;
//     //获取原始高度(由高度撑开)
//     let preHeight = parseFloat(getComputedStyle(oLeftMenu).height);
//     let preWidth = parseFloat(getComputedStyle(oLeftMenu).width);

//     window.onresize = function fn() {
//         oHeight = document.documentElement.clientHeight;
//         // console.log(oHeight);
//         //减小左侧菜单的宽度，给滚动条留出宽度
//         if (preHeight > oHeight) {
//             oLeftMenu.style.width = preWidth - 20 + 'px';
//         }
//         console.log(1);
//         oLeftMenu.style.height = oHeight + 'px';
//         return fn;
//     }();

    
//     //菜单按钮点击事件
//     oKey.onclick = function (e) {
//         e = e || window.event; //兼容IE
//         oLeftMenu.classList.add("show");
//         e.stopPropagation();
//     };
//     oCon.onclick = function () {
//         oLeftMenu.classList.remove("show");
//     };

//     //左菜单
//     oSpan.forEach(function (ele, ind) {
//         ele.onclick = function () {
//             oHidden[ind].classList.toggle("show");
//         };
//     });
// }());

