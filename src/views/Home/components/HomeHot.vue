<script setup>
import HomePanel from './HomePanel.vue'
import { findNewAPI, findHotAPI } from '@/apis/layout';
import { onMounted, ref } from 'vue';
const hotList = ref([]);
async function getHot() {  //获取分类数据的方法
    let result = await findHotAPI()
    if (result.status == 200) {
        hotList.value = result.data.result
    } else { console.error('getCategory,error') }
}
onMounted(() => {
    getHot()
})
</script>

<template>
    <HomePanel title="人气推荐" sub-title="新鲜出炉,品质靠谱">
        <ul class="goods-list">
            <li v-for="item in hotList" :key="item.id">
                <RouterLink to="/">
                    <img v-img-lazy="item.picture" :alt="item.alt" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">{{ item.title }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #ffffff;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>