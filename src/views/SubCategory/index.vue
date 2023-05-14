<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js'
import { useRoute } from 'vue-router'
import GoodsItems from '@/views/Home/components/GoodsItems.vue'

const route = useRoute()

// 展示loading 的字段
const loading = ref(true)

// 获取导航数据
const categoryDate = ref({})

async function getCategoryDate(id) {
    loading.value = true
    let result = await getCategoryFilterAPI(id)
    if (result.status == 200) {
        categoryDate.value = result.data.result
        loading.value = false
    } else {
        console.error('getCategory,error')
        // 为了防止路由参数错误,重定向到首页
        router.replace('/')
    }
}

onMounted(() => {
    getCategoryDate(route.params.id)
})


// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})

const getGoodList = async () => {
    loading.value = true
    const res = await getSubCategoryAPI(reqData.value)
    loading.value = false
    goodList.value = res.data.result.items
}

onMounted(() => getGoodList())

const tabChange = () => {
    reqData.value.page = 1
    getGoodList()
}





const disabled = ref(false) // 监听是否加载更多的字段
const load = async () => {
    // 获取下一页的数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...res.data.result.items] // 新老数据拼接
    // 加载完毕 停止监听
    if (res.data.result.items.length === 0) {
        disabled.value = true // 停止监听
    }
}
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryDate.parentId}` }">{{ categoryDate.name }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryDate.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll='load' :infinite-scroll-disabled="disabled" v-loading=loading>
                <!-- 商品列表-->
                <GoodsItems v-for="good in goodList" :good="good"></GoodsItems>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>