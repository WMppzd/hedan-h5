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
    next()
});


router.afterEach(() => {});

export default router;
