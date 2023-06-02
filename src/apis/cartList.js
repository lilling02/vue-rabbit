/*
 * @Author: Codling 
 * @Date: 2023-06-02 14:35:42 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-06-02 14:40:57
 * @Description 购物车的 api
 */
import request from "@/utils/request";

// 获取购物车列表的api
export const getCartListAPI = () => {
    return request({ url: '/member/cart', method: 'GET' })
}