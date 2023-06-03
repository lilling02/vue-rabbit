/*
 * @Author: Codling 
 * @Date: 2023-06-02 14:35:42 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-06-02 22:55:45
 * @Description 购物车的 api
 */
import request from "@/utils/request";

// 获取购物车列表的api
export const getCartListAPI = () => {
    return request({ url: '/member/cart', method: 'GET' })
}

/**
 *
 * @param string  skuId 商品sku的id
 * @param integer  count 商品的数量
 * @returns {AxiosPromise} 返回一个promise对象
 */
export const addCartAPI = (skuId, count) => {
    let data = { skuId, count }
    return request({ url: '/member/cart', method: 'POST', data })
}


