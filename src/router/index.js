import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { Toast } from 'vant';
import wx from 'weixin-js-sdk';
import { jsConfig } from '../api/info';
Vue.use(Toast);
Vue.use(Router);

// 自动导入module下所有模块
const routes = (modulesFiles => {
    return modulesFiles.keys().reduce((modules, modulePath) => {
        const value = modulesFiles(modulePath);
        modules.push(...value.default);
        return modules;
    }, []);
})(require.context('./module', false, /\.js$/));

const router = new Router({ routes, mode: 'history', base: '/', scrollBehavior: () => ({ y: 0 }) });


router.beforeEach((to, from, next) => {  
    // Geneshares(){
        let test = {
           url: 'https://map.hedan.art/'
       };
       jsConfig(test).then((response) => {
           if (response.data.code == 'OK') {
            //    let { appId, timestamp, nonceStr, signature, url } = response.data.data;

               wx.config({
                   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                   appId:response.data.data.appId, // 必填，公众号的唯一标识，填自己的！
                   timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
                   nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
                   signature: response.data.data.signature, // 必填，签名，见附录1
                   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
               });

               wx.ready(function () {
                   wx.onMenuShareAppMessage({
                       title: '个性化逛展地图生成器 Powered by 盒DAN',
                       desc: '点击开始生成',
                       link: response.data.data.url, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                       link:  response.data.data.url, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
//    }
    next()
});


router.afterEach(() => {});

export default router;
