import request from "@/utils/request";

/**
 * 
 * @description: 获取订单信息
 */
export const getCheckoutInfoAPI = () => {
    return request({ url: '/member/order/pre', method: 'get' })
}



// 创建订单
export const createOrderAPI = (data) => {
    return request({
        url: '/member/order',
        method: 'POST',
        data
    })
}