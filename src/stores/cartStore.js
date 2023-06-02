/*
 * @Author: Codling 
 * @Date: 2023-05-29 23:11:43 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-06-02 14:08:29
 * @description: 购物车数据仓库
 */
import { ref, computed } from 'vue'
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
    // 3. 删除购物车商品的方法
    const delCart = (skuId) => {
        // 通过skuId找到对应的商品对象 -- 通过使用索引删除
        // const index = cartList.value.findIndex((item) => item.skuId === skuId)
        // 通过索引删除
        // cartList.value.splice(index, 1)

        // 通过filter过滤
        const newCaerList = cartList.value.filter(item => item.skuId !== skuId)
        cartList.value = newCaerList
    }
    // 4.通过pinia的getter获取state

    const allCount = computed(() => {
        return cartList.value.reduce((total, item) => total + item.count, 0) // reduce 第一个参数是回调函数,它的返回值是累加的结果
    })

    /**
     * @description: 计算总价格
     */
    const allPrice = computed(() => {
        return cartList.value.reduce((total, item) => total + item.count * item.price, 0)
    })

    // 5. 单击修改商品的选择状态
    const singleChange = (skuId) => {
        // 2.1 修改pinia store中的数据 通过skuId找到对应的商品
        const item = cartList.value.find((i) => i.skuId === skuId);
        // 2.2 修改选中状态
        item.selected = !item.selected;
    };

    // 6. 计算属性计算出已经选择的商品的数量
    const selectedCount = computed(() => {
        // 6.1 先筛选出cartlist里面已经选择了的sku
        const selectedSku = cartList.value.filter((i) => i.selected)
        return selectedSku.reduce((total, item) => total + item.count, 0)
    })

    // 7. 计算属性计算出已经选择的商品的价格
    const selectedSkuPrice = computed(() => {
        // 7.1 先筛选出cartlist里面已经选择了的sku
        const selectedSku = cartList.value.filter((i) => i.selected)
        // 7.2 累加已经选择的商品的价格
        return selectedSku.reduce((total, item) => total + item.count * item.price, 0)
    })
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleChange,
        selectedCount,
        selectedSkuPrice
    }
}, {
    persist: true,
})