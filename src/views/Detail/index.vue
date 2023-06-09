<script setup>
import { useRoute } from 'vue-router'
import { getDetail } from '@/apis/detail'
import { ref, onMounted } from 'vue'
import DetailHot from './components/DetailHot.vue'
import ImageView from '@/components/imageView/index.vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const id = route.params.id

// 获取当前商品的详情
const detail = ref({})
const getDetailData = async () => {
    const res = await getDetail(id)
    detail.value = res.data.result
}

// sku被操作时候
const skuObj = ref({})
const skuChange = function (sku) {
    skuObj.value = sku
    console.log(sku);
}
onMounted(() => {
    getDetailData()
})


// 购买商品数量相关的数据以及操作
const count = ref(1)
const countChange = (newCount) => {
    count.value = newCount
    console.log('count.value', count.value);
    console.log('newCount', newCount);
}

// 将物品加入购物车的方法
const cartStore = useCartStore()
const addCart = () => {
    // 1. 判断是否已经选择了商品的规格,如果有则添加没有则提示
    if (skuObj.value.skuId) {
        // 2. 调用pinia仓库的暴露的api添加商品
        let result = cartStore.addCart({
            id: detail.value.id,
            name: detail.value.name,
            picture: detail.value.mainPictures[0],
            price: detail.value.price,
            count: count.value,
            skuId: skuObj.value.skuId,
            attrsTest: skuObj.value.attrsTest,
            selected: true
        })
        if (result) {
            ElMessage.success('添加成功')
        }
    } else {
        ElMessage.warning('请选择规格')
    }
}
</script>

<template>
    <div class="xtx-goods-page">
        <div class="container">
            <div class="bread-container">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/category/${detail.categories?.[1].id}` }">{{
                        detail.categories?.[1].name
                    }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/category/sub/${detail.categories?.[0].id}` }">{{
                        detail.categories?.[0].name }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detail.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <ImageView :image-list="detail.mainPictures" />
                            <!-- 统计数量 -->
                            <ul class="goods-sales">
                                <li>
                                    <p>销量人气</p>
                                    <p> 100+ </p>
                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>商品评价</p>
                                    <p>200+</p>
                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏人气</p>
                                    <p>300+</p>
                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>品牌信息</p>
                                    <p>400+</p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                                </li>
                            </ul>
                        </div>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name"> {{ detail.name }} </p>
                            <p class="g-desc">{{ detail.desc }} </p>
                            <p class="g-price">
                                <span>{{ detail.oldPrice }}</span>
                                <span> {{ detail.price }}</span>
                            </p>
                            <div class="g-service">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>12月好物放送,App领券购买直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>无忧退货</span>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                            <!-- sku组件 -->
                            <XtxSku :goods="detail" @change="skuChange" />
                            <!-- 数据组件 -->
                            <el-input-number v-model="count" @change="countChange" />
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                        </div>
                    </div>
                    <div class="goods-footer">
                        <div class="goods-article">
                            <!-- 商品详情 -->
                            <div class="goods-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="goods-detail">
                                    <!-- 属性 -->
                                    <ul class="attrs">
                                        <li v-for="item in detail.details?.properties" :key="item.name">
                                            <span class="dt">{{ item.name }}</span>
                                            <span class="dd">{{ item.value }}</span>
                                        </li>
                                    </ul>
                                    <!-- 图片 -->
                                    <img v-img-lazy="item" v-for="item in detail.details?.pictures" :key="item" />
                                </div>
                            </div>
                        </div>
                        <!-- 24热榜+专题推荐 -->
                        <div class="goods-aside">
                            <!-- 天 -->
                            <DetailHot :type=1 />
                            <!-- 周 -->
                            <DetailHot :type=2 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: $priceColor;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: $xtxColor;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: $priceColor;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: $xtxColor;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: $xtxColor;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: $priceColor;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;

}

.bread-container {
    padding: 25px 0;
}
</style>