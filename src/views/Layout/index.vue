<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LaoutSticky from './components/LaoutSticky.vue';
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
// 触发获取导航数据的方法
const categoryStore = useCategoryStore()
onMounted(() => {
    categoryStore.getCategory()
})
</script>

<template>
    <LaoutSticky />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加上key 破坏复用机制 强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>

<style scoped lang="scss"></style>
