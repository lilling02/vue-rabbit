import request from '@/utils/request'

// 获取订单数据
export const getOrderAPI = (id) => {
    return request({
        url: `/member/order/${id}`
    })
}