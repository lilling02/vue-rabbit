<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
// 1.获取用户信息
const { userInfo, clearUserInfo } = useUserStore()
const router = useRouter()

// 3. 获取购物车数据
const cartStore = useCartStore()

// 2. TODO: 点击按钮退出登录 并且清空用户信息
const confirm = () => { // 这是点退出登录按钮的回调函数

    // 2.1 清空用户信息
    clearUserInfo()

    // 2.2 跳转到登录页
    router.push('/login')

    // 2.3 清空本地购物车
    cartStore.clearCart()
}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模板渲染,如果用户登录渲染这个模板 -->
                <template v-if="userInfo.token">
                    <li><a href="javascript:;"><i class=" iconfont icon-user"></i>{{ userInfo.account }}</a></li>
                    <li>
                        <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="confirm">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;">会员中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>