// 管理用户相关的数据的store

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/apis/user.js'


export const useUserStore = defineStore('user', () => {


    // 1.定义管理用户数据的字段
    const userInfo = ref({})

    // 2.定义获取用户数据的方法
    const getUserInfo = async (data) => {
        const result = await loginApi(data);
        userInfo.value = result.data.result;
    }
    return {
        userInfo,
        getUserInfo
    }
}, {
    persist: true,
})
