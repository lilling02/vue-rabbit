<script setup>
import { useCartStore } from '@/stores/cartStore';
import { ElMessage } from 'element-plus';
// 1. 从pinia store 中获取购物车的数据
const cartStore = useCartStore()

// 2. 写单选框选中时候的回调
const singleChange = (skuId) => {
    // // 2.1 修改pinia store中的数据 通过skuId找到对应的商品
    // const item = cartList.find((i) => i.skuId === skuId);
    // // 2.2 修改选中状态
    // item.selected = !item.selected;

    // 2.3 因为这是在修改pinia store中的数据 我们把方法写到了store中 直接调用store中的方法即可
    cartStore.singleChange(skuId);

};

// 3. 全选功能的实现
const allCheck = (selected) => {
    cartStore.allCheck(selected)
}

// 4. 删除购物车商品
const delCart = (i) => {
    let result = cartStore.delCart(i.skuId)
    if (result) {
        // 调用element-ui的message提示
        ElMessage.success('删除成功')
    }
}
</script>

<template>
    <div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in cartStore.cartList" :key="i.id">
                            <td>
                                <el-checkbox :model-value="i.selected" @change="singleChange(i.skuId)" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ i.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                    <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                        @confirm="delCart(i)">
                                        <template #reference>
                                            <a href="javascript:;">删除</a>
                                        </template>
                                    </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="cartStore.cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="购物车列表为空">
                                        <el-button type="primary">随便逛逛</el-button>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    共 {{ cartStore.allCount }} 件商品,已选择 {{ cartStore.selectedCount }} 件,商品合计:
                    <span class="red">¥ {{ cartStore.selectedSkuPrice }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary" @click="$router.push('/checkout')">下单结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
            color: #999;
            padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
            color: $xtxColor;
        }

        .xtx-numbox {
            margin: 0 auto;
            width: 120px;
        }
    }

    .red {
        color: $priceColor;
    }

    .green {
        color: $xtxColor;
    }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;

        img {
            width: 100px;
            height: 100px;
        }

        >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;

            .attr {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        .xtx-checkbox {
            color: #999;
        }

        .batch {
            a {
                margin-left: 20px;
            }
        }

        .red {
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}
</style>