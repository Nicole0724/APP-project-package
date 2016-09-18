// submitData(_dataVid,0);  中0代表分享到朋友圈，1代表分享到朋友 ，2代表播放数，3代表浏览数
//<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

/*  分享页面中调用方法
*  var _url = Wsw.utils.GetUrl();
*  _url = _url.replace(/\&/g, "fuck");
 Wsw.utils.shareUrl(_url);
 //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页
 wx.ready(function () {
 Wsw.utils.shareWeixin(1);
 });
*
*
* */


//获得当前地址

var _url;
// $(function () {
//     var _url;
// });

//微信签名
Wsw.utils.shareUrl = function (_lu) {
    _url = _lu;
    //分享签名
    $.ajax({
        type: 'post',
        url: 'http://v.wasowa.cn/apiv1/wechatshare/signPackage',/*后端提供签名接口*/
        dataType: 'json',
        async: false,
        data: {
            url: _url
        },
        success: function (data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "chooseWXPay"
                ]
            });
        }
    });
}


//按约定格式化日期
Wsw.utils.shareWeixin = function (_shareType) {
    var _title, _desc, _link;
    var _imgUrl = 'http://video.tunnel.wasowa.cn/html/assets/images/logo.png';/*logo地址*/
    var _type = 'link';
    var _dataUrl = '';
    if (_shareType == 0) {
        wx.showOptionMenu();
        //分享详情页面
        // _title = $("#share_title").val();
        // _desc = $("#share_detail").val();
        _title = '分享title';
        _desc = '分享描述';
        _link = _url.replace(/fuck/g, "&");
    } else if (_shareType == 1) {
        wx.showOptionMenu();
        //分享除详情页面以外的页面,分享内容为app详情
        _title = '分享title';
        _desc = '分享描述';
        _link = '分享链接';
        // _link = 'http://v.wasowa.cn/marketingPromotion/index.html?status='+amaldar_stu;
    } else {
        wx.hideOptionMenu();
    }

    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: _title,
        link: _link,
        imgUrl: _imgUrl,
        trigger: function (res) {
            // alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            // alert('已分享');
        },
        cancel: function (res) {
            // alert('已取消');
        },
        fail: function (res) {
            // alert(JSON.stringify(res));
        }
    });

    //分享给朋友
    wx.onMenuShareAppMessage({
        title: _title, // 分享标题
        desc: _desc, // 分享描述
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        type: _type, // 分享类型,music、video或link，不填默认为link
        dataUrl: _dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            // alert('已分享');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert('已取消');
        }
    });
}