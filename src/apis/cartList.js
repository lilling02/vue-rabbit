/*
 * @Author: Codling 
 * @Date: 2023-06-02 14:35:42 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-06-03 21:19:47
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

/**
 * 删除购物车中的商品
 * @param {String[]} ids - 要删除的商品ID数组,每一项为字符串类型
 * @return {Promise} 返回一个Promise对象
 */
export const delCartAPI = (ids) => {
    return request({ url: `/member/cart`, method: 'DELETE', data: { ids } })
}