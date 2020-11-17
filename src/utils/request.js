import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import { Toast } from 'vant';
Vue.use(Toast);
Toast.setDefaultOptions({ duration: 2000 });

const service = axios.create({
    timeout: 10000,
    // transformRequest: [data => data],
    headers: {
        'Content-Type': 'application/json'
    }
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${store.getters.token}`;
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
        return response
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
    // config.baseURL = uri;
    return service(config);
}
