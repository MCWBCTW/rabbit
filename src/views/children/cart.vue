<template>
    <div class="cart">
        <crumbs :curmbsRouter="curmbsRouter"></crumbs>
        <div class="list">
            <div class="head bor-b">
                <div class="temp temp-1">
                    <div class="checkbox" :class="false ? 'check' : 'uncheck'">
                        <span class="hook" v-show="false">√</span>
                    </div>
                    <span :class="false ? 'checkText' : 'uncheckText'">全选</span>
                </div>
                <div class="temp fcc temp-2">
                    <span class="label">商品信息</span>
                </div>
                <div class="temp fcc temp-3">
                    <span class="label">单价</span>
                </div>
                <div class="temp fcc temp-4">
                    <span class="label">数量</span>
                </div>
                <div class="temp fcc temp-4">
                    <span class="label">小计</span>
                </div>
                <div class="temp fcc temp-5">
                    <span class="label">操作</span>
                </div>
            </div>
            <cartGoods></cartGoods>
        </div>
    </div>
</template>


<script setup lang="ts">
    
    interface Icurmbs {
        title: string;
        router: string;
        jumpFlag: boolean
    }

    // 面包屑 内容配置
    const curmbsRouter: Array<Icurmbs> = [{
        title: '首页',
        router: '/',
        jumpFlag: true
    }, {
        title: '购物车',
        router: '',
        jumpFlag: false
    }]
    
    
</script>


<style scoped>
    .cart {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
    }
    .list {
        width: 1240px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
    }
    .head {
        width: 1240px;
        height: 70px;
        display: flex;
        flex-direction: row;
    }
    .temp {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .temp-1 {
        width: 120px;
        padding: 10px 10px 10px 30px;
        box-sizing: border-box;
    }
    .checkbox {
        width: 13px;
        height: 13px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        margin-right: 3px;
    }
    .hook {
        color: #27ba9b;
        font-size: 12px;
        line-height: 13px;
    }
    .check {
        border: 1px solid #27ba9b;
    }
    .uncheck {
        border: 1px solid #999999;
    }
    .checkText {
        color: #27ba9b;
        font-size: 16px;
        font-weight: 400;
    }
    .uncheckText {
        color: #999999;
        font-size: 16px;
        font-weight: 400;
    }
    .temp-2 {
        width: 400px;
    }
    .temp-3 {
        width: 220px;
    }
    .temp-4 {
        width: 180px;
    }
    .temp-5 {
        width: 140px;
    }
    .label {
        font-size: 16px;
        color: #666666;
    }
    .line {
        width: 1240px;
        height: 120px;
        display: flex;
        flex-direction: row;
    }
    .fcc {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ac {
        display: flex;
        align-items: center;
    }
    .bor-b {
        border-bottom: 1px solid #f5f5f5;
    }
</style>