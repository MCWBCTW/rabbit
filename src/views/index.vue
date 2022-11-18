<template>
    <div class="index">
        <div class="head">
            <div class="titlebox">
                <span class="title">请先登录</span>
                <span class="title bor-l">免费注册</span>
                <span class="title bor-l">我的订单</span>
                <span class="title bor-l">会员中心</span>
                <span class="title bor-l">帮助中心</span>
                <span class="title bor-l">关于我们</span>
                <div class="title bor-l">
                    <span class="iconfont icon-shouji icon"></span>
                    <span>手机版</span>
                </div>
            </div>
        </div>
        <div class="bars">
            <div class="barsbox">
                <img class="headImage" src="../assets/images/index_logo.png">
                <span class="barsText">首页</span>
                <span class="barsText">居家</span>
                <span class="barsText">美食</span>
                <span class="barsText">服饰</span>
                <span class="barsText">母婴</span>
                <span class="barsText">个护</span>
                <span class="barsText">严选</span>
                <span class="barsText">数码</span>
                <span class="barsText">运动</span>
                <span class="barsText">杂项</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useRouter } from 'vue-router';
    export default {
        data(){
            return {

            }
        },
        setup(){
            
        }
    }
</script>
<!-- 宽1240 横栏53 -->
<style>
    .index {
        width: 100vw;
        display: flex;
        flex-direction: column;
    }
    /* 顶部标题 */
    .head {
        width: 100vw;
        height: 53px;
        background-color: #333333;
        display: flex;
        justify-content: center;
    }
    .titlebox {
        width: 1240px;
        height: 53px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .title {
        padding: 0 15px;
        font-size: 14px;
        line-height: 14px;
        color: #cdcdcd;
        cursor: pointer;
    }
    .bor-l {
        border-left: 2px solid #666666;
    }
    .title:hover {
        color: #27ba9b;
    }
    .icon {
        font-size: 14px;
    }
    /* 中部分栏区域 */
    .bars {
        width: 100vw;
        height: 132px;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
    }
    .barsbox {
        width: 1240px;
        height: 132px;
        border: 1px solid red;
        display: flex;
        align-items: center;
    }
    .headImage {
        width: 200px;
        height: 132px;
    }
    .barsText {
        font-size: 16px;
        line-height: 32px;
        color: #333333;
        cursor: pointer;
    }
</style>