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
