<script setup>
import { useRoute } from 'vue-router'
import { fetchHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
    type: {
        type: Number,
        default: 1
    }
})

const route = useRoute()

const hotGoods = ref([])

const reqData = ref({
    id: route.params.id,
    type: props.type,
    limit: 3
})

const getHotGoods = async () => {
    try {
        let res = await fetchHotGoodsAPI(reqData)
        hotGoods.value = res.data.result
    } catch (err) {
        console.log(err)
        return []
    }
}

onMounted(() => {
    getHotGoods()
})


//  处理标题的模块
const typeMap = {
    1: '24小时热榜',
    2: '周热榜'
}

const title = computed(() => typeMap[props.type])
</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="good in hotGoods" :key="good.id">
            <img :src="good.picture" alt="" />
            <p class="name ellipsis">{{ good.name }}</p>
            <p class="desc ellipsis">{{ good.desc }}</p>
            <p class="price">&yen;{{ good.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

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
}
</style>