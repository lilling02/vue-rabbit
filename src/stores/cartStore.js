/*
 * @Author: Codling 
 * @Date: 2023-05-29 23:11:43 
 * @Last Modified by: Codling
 * @Last Modified time: 2023-06-02 23:29:22
 * @description: 购物车数据仓库
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCartListAPI, addCartAPI } from '@/apis/cartList'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
    // 8.目前为止本地购物车能使用的逻辑操作都已经准备好了,接下来就是做登录状态下的分支判断,补充登录状态下的购物车逻辑
    // 8.1 获取token好判断是否登录 这里方法很多,我们选择判断pinia 的 user 这个 store 里面是否存在useUserStore.userInfo.token这种方法
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 1. 定义state - cartList
    const cartList = ref([])

    // 2. 定义action - addCart
    const addCart = async (goods) => {
        // 8.2 登录后的添加购物车逻辑
        if (isLogin.value) {
            // 8.2.1 调用接口加入购物车
            let addCartResult = await addCartAPI(goods.skuId, goods.count)
            console.log('addCartResult', addCartResult);
            // 8.2.2 调用接口获取购物车列表
            let CartListResult = await getCartListAPI()
            console.log('CartListResult', CartListResult);
            // 8.2.3 用购物车列表替换掉本地的购物车列表
            cartList.value = CartListResult.data.result
        } else {
            // 添加购物车操作-- 本地购物车逻辑
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
    const selectedSkuPrice = computed(() => cartList.value.filter((i) => i.selected).reduce((total, item) => total + item.count * item.price, 0))

    // 全选功能action
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }
    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected))



    return {
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedSkuPrice,
        isAll,
        isLogin,
        addCart,
        delCart,
        singleChange,
        allCheck,
    }
}, {
    persist: true,
})