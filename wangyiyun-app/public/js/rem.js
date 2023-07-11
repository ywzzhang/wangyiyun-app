//rem布局（移动端适配）--窗口改变时字页面能够根据屏幕宽度自动整体缩放
function remSize() {
    //获取设备的宽度。
    //document.documentElement.clientWidth获取的是屏幕可视区域的宽度，不包括滚动条与工具条
    //window.innerWidth获取的是可视区域宽度，但包含了纵向滚动条的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }

    //设置html（根元素）字体大小：750px-->1rem=100px,375px-->1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    //设置body字体大小
    document.querySelector('body').style.fontSize=0.3 + "rem"
}

//初始化字体大小
remSize()
//窗口变化时改变字体大小
window.onresize=function() {
    remSize()
}