import request from '../utils/request';

// 获取验签信息
export function getSigninfo(data) {
    console.log(data)
    return request({
        type: 'getSign',
        url: '/api/sms/getSign',
        method: 'post',
        data: data
    });
}

// 获取用户信息
// export function getUserinfo(data) {
//     console.log(data)
//     return request({
//         type: 'passport',
//         url: '/userve/user/userinfo',
//         method: 'get',
//         params: data
//     });
// }

// 发送手机验证码
// export function sendcode(data) {
//     return request({
//         type: 'passport',
//         url: '/userve/common/sendcode',
//         method: 'post',
//         data: data
//     });
// }
