import request from '../utils/request';
import fetchvip from '../utils/fetchvip'

// 获取用户信息
export function getUserinfo(data) {
    console.log(data)
    return request({
        type: 'passport',
        url: '/userve/user/userinfo',
        method: 'get',
        params: data
    });
}

// 发送手机验证码
export function sendcode(data) {
    return request({
        type: 'passport',
        url: '/userve/common/sendcode',
        method: 'post',
        data: data
    });
}

// 暑期培优vip卡兑换接口
export function saveandconvert(data) {
    return fetchvip({
        url: '/summertraincard/saveandconvert',
        method: 'post',
        data: data
    });
}

// 暑期培优vip卡获取班型
export function getClassType(data) {
    return fetchvip({
        url: '/summertraincard/card-password-info',
        method: 'get',
        params: data
    });
}