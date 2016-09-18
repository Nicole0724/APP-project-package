/**
 * Created by wa on 2016/9/13.
 */

/*
* 使用方法，用于微信端，微信授权问题需要后端提供授权接口
* 
* */


// 全局函数定义-通用方法
Wsw.login = function(name) {

}

Wsw.login.isEmpower = function(funcs, opt) {
    $.post('http://video.tunnel.wasowa.cn/login/islogin', {},
        function(data) {
            switch (parseInt(data.status)) {
                case 200:
                    console.log("授权成功");
                    funcs.func200();
                    break;
                case 403:
                    if (opt != '' && opt != undefined && opt != null) {
                        location.href = 'http://video.tunnel.wasowa.cn/?url=html/marketingPromotion/' + Wsw.utils.PageName() + opt;
                    } else {
                        location.href = 'http://video.tunnel.wasowa.cn/?url=html/marketingPromotion/' + Wsw.utils.PageName();
                    }
                    break;
                default:
                    break;
            }
        }, "json");
}