<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    good: {
        type: Object,
        required: true
    }
})

const toDetail = () => {
    router.push({ path: `/detail/${props.good.id}` })
}
</script>

<template>
    <!-- 这一个li 就是一个商品详情,值得封装一下 -->
    <RouterLink to="/" class="goods-item" @click="toDetail">
        <!-- 这一个li 就是一个商品详情,值得封装一下 -->
        <img v-img-lazy="good.picture" alt="" />
        <p class="name ellipsis">{{ good.name }}</p>
        <p class="desc ellipsis">{{ good.desc }}</p>
        <p class="price">&yen;{{ good.price }}</p>
    </RouterLink>
</template>

<style lang='scss' scoped>
.goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

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
</style>