<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryFilterAPI } from '@/apis/category.js'
import { useRoute } from 'vue-router'
import GoodsItems from '@/views/Home/components/GoodsItems.vue'

const route = useRoute()

const categoryDate = ref({})

async function getCategoryDate(id) {
    let result = await getCategoryFilterAPI(id)
    if (result.status == 200) {
        categoryDate.value = result.data.result
        console.log(categoryDate.value);
    } else {
        console.error('getCategory,error')
        // 为了防止路由参数错误,重定向到首页
        router.replace('/')
    }
}

onMounted(() => {
    getCategoryDate(route.params.id)
})

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
            <el-tabs>
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body">
                <!-- 商品列表-->
                <GoodsItems v-for="good in categoryDate.goods" :good="good"></GoodsItems>
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