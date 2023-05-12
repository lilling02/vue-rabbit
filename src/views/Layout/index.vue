<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LaoutSticky from './components/LaoutSticky.vue';
</script>

<template>
    <LaoutSticky />
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>

<style scoped lang="scss"></style>
