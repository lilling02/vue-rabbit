import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'

export function useCategory() {

    // 获取路由参数
    const route = useRoute()


    const categoryData = ref({})
    async function getCategory(id = route.params.id) {
        let result = await getCategoryAPI(id)
        if (result.status == 200) {
            categoryData.value = result.data.result
        } else {
            console.error('getCategory,error')
            // 为了防止路由参数错误,重定向到首页
            router.replace('/')
        }
    }
    onMounted(() => {
        getCategory()
    })


    // 我们期望在路由参数变化的时候重新获取数据
    // 重用的组件里调用 beforeRouteUpdate

    onBeforeRouteUpdate((to, from, next) => {
        getCategory(to.params.id)
        next()
    })

    return {
        categoryData
    }
}