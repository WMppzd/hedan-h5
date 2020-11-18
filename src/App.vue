<template>
    <div id="app">
        <keep-alive :include="keepAlive">
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { jsConfig } from './api/info';
export default {
    name: 'App',
    data() {
        return {
            keepAlive: []
        };
    },
    methods:{
         Geneshares(){
             let test = {
                url: process.env.VUE_APP_COURSE 
            };
            jsConfig(test).then((response) => {
                if (response.data.code == 'OK') {
                    let { appId, timestamp, nonceStr, signature, url } = response.data.data;

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识，填自己的！
                        timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });

                    wx.ready(function () {
                        wx.onMenuShareAppMessage({
                            title: '个性化逛展地图生成器 Powered by 盒DAN',
                            desc: '点击开始生成',
                            link: url+ '?id=2', //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://file.hedan.art/share.jpg',
                            type: '',
                            dataUrl: '',
                            success: function () {
                                console.log('分享成功');
                            },
                            cancel: function () {
                                console.log('取消分享');
                            }
                        });
                    });

                    wx.onMenuShareTimeline({
                            title: '个性化逛展地图生成器 Powered by 盒DAN',
                            desc: '点击开始生成',
                            link: url+ '?id=2', //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://file.hedan.art/share.jpg',
                            type: '',
                            dataUrl: '',
                            success: function () {
                                console.log('分享成功');
                            },
                            cancel: function () {
                                console.log('取消分享');
                            }
                    });
                }
            });
        }
    },
    created(){
    //   this.Geneshares()
      console.log(22222)
    }
};
</script>

<style lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
    background-color: $bg_c;
}
.router-view-c {
    position: absolute;
    transition: opacity 0.5s, transform 0.5s;
    width: 100%;
    height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
.passport-toast {
    width: auto;
    padding: 35px 50px 33px;
    min-height: auto;
    border-radius: 15px;
    i {
        font-size: 40px;
    }
    div {
        margin-top: 25px;
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        max-width: 282px;
    }
}
.van-cell::after {
    border: none;
}
</style>
