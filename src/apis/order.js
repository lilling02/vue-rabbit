import request from '@/utils/request'

// 获取订单接口
export const getUserOrder = (params) => {
    return request({
        url: '/member/order',
        method: 'GET',
        params
    })
}