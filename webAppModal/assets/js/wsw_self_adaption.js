/**
 * Created by wa on 2016/9/13.
 */
/*使用方法
* 将文件引入页面中放在jquery库之后，用于html元素基数font-size的定义
* 以iPhone6为标准而定义基数 因为此时font-size 的值为10px 便于计算
* */
$(function () {
    var jz_num;
    offWidth = $(window).width();
    offHeight = $(window).height();
    jz_num = offWidth / 750;
    $("html").css("font-size", jz_num * 20 + "px");
});