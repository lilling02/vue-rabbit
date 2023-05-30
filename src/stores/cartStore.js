/*
 * @Author: Codling 
 * @Date: 2023-05-29 23:11:43 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-05-30 10:39:43
 * @description: 购物车数据仓库
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = (goods) => {
        console.log('添加', goods)
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路:通过匹配传递过来的商品对象中的skuId能不能在cartList中找到,找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            // 找到了
            item.count++
        } else {
            // 没找到
            cartList.value.push(goods)
        }
    }
    return {
        cartList,
        addCart
    }
}, {
    persist: true,
})