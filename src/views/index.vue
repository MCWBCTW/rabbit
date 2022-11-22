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
                <div class="textbox">
                    <span class="barsText">首页</span>
                    <span class="barsText" @mouseenter="mouseEnter(1)" @mouseleave="mouseLeave">居家</span>
                    <span class="barsText" @mouseenter="mouseEnter(2)" @mouseleave="mouseLeave">美食</span>
                    <span class="barsText" @mouseenter="mouseEnter(3)" @mouseleave="mouseLeave">服饰</span>
                    <span class="barsText" @mouseenter="mouseEnter(4)" @mouseleave="mouseLeave">母婴</span>
                    <span class="barsText" @mouseenter="mouseEnter(5)" @mouseleave="mouseLeave">个护</span>
                    <span class="barsText" @mouseenter="mouseEnter(6)" @mouseleave="mouseLeave">严选</span>
                    <span class="barsText" @mouseenter="mouseEnter(7)" @mouseleave="mouseLeave">数码</span>
                    <span class="barsText" @mouseenter="mouseEnter(8)" @mouseleave="mouseLeave">运动</span>
                    <span class="barsText" @mouseenter="mouseEnter(9)" @mouseleave="mouseLeave">杂项</span>
                </div>
                <div class="searchbox">
                    <span class="iconfont icon-fangdajing searchLogo"></span>
                    <input type="text" class="searchInput" v-model="keyword" placeholder="搜一搜">
                </div>
                <div class="cartbox">
                    <span class="iconfont icon-gouwuche cartLogo"></span>
                    <div class="cartNum">
                        <span>1</span>
                    </div>
                </div>
            </div>
            <div class="linebox" :class="isHover ? 'hei-100' : 'hei-0'"></div>
        </div>
        <div class="coverbox">
            <div class="menu">
                <div class="menu-line" v-for="(item, index) in menuArray" :key="index">
                    <span class="fs-16">{{item.title}}</span>
                    <span class="fs-14">{{item.subtitle_1}}</span>
                    <span class="fs-14">{{item.subtitle_2}}</span>
                </div>
            </div>
            <div class="menu-con"></div>
        </div>
        <swiper :width="1240" :height="500" :leftLeft="250" :btnTop="225" :imageArray="imageArray"></swiper>
    </div>
</template>

<script setup lang="ts">
    import swiper from '../components/swiper.vue';
    import { reactive, ref } from 'vue';
    // banner图片地址
    const imageArray:Array<string> = reactive([
        'src/assets/images/index/banner1.jpg',
        'src/assets/images/index/banner2.jpg',
        'src/assets/images/index/banner3.jpg',
        'src/assets/images/index/banner4.jpg',
        'src/assets/images/index/banner5.jpg'
    ]);
    // 声明菜单栏内容接口
    interface Imenu {
        title: string;
        subtitle_1: string;
        subtitle_2: string;
    }
    // 菜单栏内容
    const menuArray:Array<Imenu> = reactive([
        {
            title: '居家', subtitle_1: '茶咖酒具', subtitle_2: '水具杯壶'
        },
        {
            title: '美食', subtitle_1: '网易黑猪', subtitle_2: '水产海鲜'
        },
        {
            title: '服饰', subtitle_1: '室外拖鞋', subtitle_2: '春夏潮鞋'
        },
        {
            title: '母婴', subtitle_1: 'T恤/polo/衬衫', subtitle_2: '卫衣/毛衫'
        },
        {
            title: '个护', subtitle_1: '家庭清洁', subtitle_2: '浴室用品'
        },
        {
            title: '严选', subtitle_1: '卫浴用品', subtitle_2: '高级珠宝'
        },
        {
            title: '数码', subtitle_1: '影音娱乐', subtitle_2: '乐器'
        },
        {
            title: '运动', subtitle_1: '登机箱', subtitle_2: '托运箱'
        },
        {
            title: '杂项', subtitle_1: '乐器杂项', subtitle_2: ''
        },
        {
            title: '品牌', subtitle_1: '品牌推荐', subtitle_2: ''
        }
    ])
    let keyword = ref('');

    let hoverIndex:any = ref(-1); // 当前移入的横栏项下标
    let isHover:any = ref(false); // 横栏移入状态
    // 鼠标进入横栏项
    function mouseEnter(index:number){
        hoverIndex.value = index;
        isHover.value = true;
    }
    // 鼠标移出横栏项
    function mouseLeave(){
        hoverIndex.value = -1;
        isHover.value = false;
    }
</script>
<!-- 宽1240 横栏53 -->
<style>
    .index {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
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
        display: flex;
        align-items: center;
        position: relative;
    }
    .headImage {
        width: 200px;
        height: 132px;
        cursor: pointer;
    }
    .textbox {
        width: 820px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .barsText {
        font-size: 16px;
        line-height: 32px;
        color: #333333;
        cursor: pointer;
    }
    .barsText:hover {
        color: #27ba9b;
        border-bottom: 1px solid #27ba9b;
    }
    .searchbox {
        width: 170px;
        height: 32px;
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        align-items: center;
    }
    .searchInput {
        border: none;
        outline: none;
    }
    .searchInput::placeholder {
        color: #cccccc;
    }
    .searchLogo {
        font-size: 18px;
    }
    .cartbox {
        position: relative;
        width: 50px;
        height: 32px;
        display: flex;
        align-items: flex-end;
        cursor: pointer;
    }
    .cartLogo {
        font-size: 24px;
        font-weight: 600;
        margin-left: 10px;
    }
    .cartNum {
        width: 20px;
        height: 16px;
        background-color: #ef6237;
        border-radius: 100px;
        color: #ffffff;
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .linebox {
        width: 1240px;
        position: absolute;
        top: 150px;
        z-index: 99;
        transition: height .2s linear;
        box-shadow: 0 0 5px #cccccc;
        background-color: #ffffff;
    }
    .hei-100 {
        height: 100px;
    }
    .hei-0 {
        height: 0px;
    }
    .coverbox {
        width: 1240px;
        height: 500px;
        position: absolute;
        display: flex;
        top: 185px;
        z-index: 98;
    }
    .menu {
        width: 250px;
        height: 500px;
        background-color: rgba(0, 0, 0, .7);
    }
    .menu-line {
        width: 250px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 40px;
        box-sizing: border-box;
    }
    .menu-line:hover {
        background-color: #27ba9b;
    }
    .menu-line span {
        color: #ffffff;
        margin-right: 4px;
    }
    .menu-con {
        width: 990px;
        height: 500px;
        display: none;
        background-color: #27ba9b;
    }

    .fs-16 {
        font-size: 16px;
    }
    .fs-14 {
        font-size: 14px;
    }
</style>