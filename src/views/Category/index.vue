<script setup>
import { getCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import GoodsItems from '@/views/Home/components/GoodsItems.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
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


// 我们期望在路由参数变化的时候cong重新获取数据
// 重用的组件里调用 beforeRouteUpdate

onBeforeRouteUpdate((to, from, next) => {
    getCategory(to.params.id)
    next()
})
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <HomeBanner distributionSite="2" class="banner"></HomeBanner>
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink to="/">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <GoodsItems v-for="good in item.goods" :good="good" :key="good.id" />
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped lang="scss">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }

    .banner {
        position: relative !important;
        margin: 0 auto !important;
    }
}
</style>