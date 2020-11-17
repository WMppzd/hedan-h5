import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import { Toast } from 'vant';
Vue.use(Toast);
Toast.setDefaultOptions({ duration: 2000 });

const service = axios.create({
    timeout: 10000,
    transformRequest: [data => qs.stringify(data)],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${store.getters.token}`;
            // config.headers['Authorization'] =
            //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGFzc3BvcnRkZXYuZG91c2hlbi5jb20iLCJhdWQiOiJodHRwczpcL1wvcGFzc3BvcnRkZXYuZG91c2hlbi5jb20iLCJpYXQiOjE1OTMzMzIzNjQsIm5iZiI6MTU5MzMzMjM2NCwianRpIjozNDc4MjR9.UIke43xwQfOPQzxmMsiT7w-TcyHmqdacp1JFRBo16E0';
        }
        return config;
    },
    error => {
        return Promise.reject(error.message);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        // alert(response.config.url);
        let request_url = response.config.url;
        let requestList=['/order/order/create' , '/order/order/pullstartclass','/activity/share/bind','/activity/share/uploadwechat']
        if (requestList.includes(request_url)) {
            return response.data;
        } else if (response.data.code == 607 && request_url === '/userve/user/login'){
            return response.data
        } else {
            const { code, data, err_msg, tips, statusCode } = response.data;
            if (code === 200 || statusCode === 0 || statusCode === 200) {
                return data;
            } else {
                let msg = tips || err_msg;
                Toast({ message: msg, className: 'passport-toast' });
                return Promise.reject(msg);
            }
        }
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            Toast({ message: '接口请求超时', icon: 'warning', className: 'passport-toast' });
        }
        return Promise.reject(error.message);
    }
);

const URLS = {
    getSign: process.env.VUE_APP_COURSE
};

export default function(config) {
    let uri = URLS[config['type']];
    if (!uri) throw '未获取到该type对应的baseURL---' + config['type'];
    config.baseURL = uri;
    return service(config);
}
