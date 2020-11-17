import request from '../utils/request';

// 获取验签信息
export function getSigninfo(data) {
    return request({
        type: 'getSign',
        url: '/api/sms/getSign',
        method: 'post',
        data: data
    });
}


// 获取验证码信息
export function sendCodeinfo(data) {
    return request({
        type: 'getSign',
        url: '/api/sms/sendCode/login',
        method: 'post',
        data: data
    });
}

// 登录信息
export function verifyinfo(data) {
    return request({
        type: 'getSign',
        url: '/api/passport/login/verify',
        method: 'post',
        data: data
    });
}