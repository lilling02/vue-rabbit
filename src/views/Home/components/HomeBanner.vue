<script setup>
import { getBannerAPI } from '@/apis/layout';
import { onMounted, ref } from 'vue';

// 广告区域展示位置(投放位置 投放位置,1为首页,2为分类商品页) 默认是1
const props = defineProps({
    distributionSite: {
        type: String,
        default: "1"
    }
})

// 获取轮播图的数据
const bannerList = ref([]);
async function getBanner() {  //获取分类数据的方法
    let result = await getBannerAPI({ distributionSite: props.distributionSite })
    if (result.status == 200) {
        bannerList.value = result.data.result
    } else { console.error('getCategory,error') }
}
onMounted(() => {
    getBanner()
})
</script>



<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>