import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from "@/apis/layout.js"
export const useCategoryStore = defineStore('category', () => {
    // 导航列表的数据管理 category
    let categoryList = ref([])      // 存储分类数据的数组
    async function getCategory() {  //获取分类数据的方法
        let result = await getCategoryAPI()
        if (result.status == 200) {
            categoryList.value = result.data.result
            return result.data.result
        } else { console.error('getCategory,error') }
    }

    return { categoryList, getCategory }
})
