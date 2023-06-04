import request from "@/utils/request";

/**
 * 
 * @description: 获取订单信息
 */
export const getCheckoutInfoAPI = () => {
    return request({ url: '/member/order/pre', method: 'get' })
}