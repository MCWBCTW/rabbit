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
                    <span class="barsText" v-for="(item, index) in crossBarArray.data" :key="index"
                        @mouseenter="mouseEnter(Number(index)+1)" @mouseleave="mouseLeave(Number(index)+1)">{{item.title}}</span>
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
            <div class="linebox" :class="isHover ? 'hei-150' : 'hei-0'" @mouseenter="lineMouseEnter" @mouseleave="lineMouseLeave">
                <div class="linebox-item" v-for="(item, index) in barsImageArray.data[hoverIndex-1]" :key="index">
                    <img :src="item.image">
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="swiperbox">
            <div class="coverbox" @mouseleave="menuBoxMouseOut">
                <div class="menu">
                    <div class="menu-line" :style="{backgroundColor: `${activeMenuLine == index ? '#27ba9b' : 'transparent'}`}" 
                        v-for="(item, index) in menuArray.data" :key="index" @mouseenter="menuLineMouseEnter(index)">
                        <span class="fs-16">{{item.title}}</span>
                        <span class="fs-14">{{item.subtitle_1}}</span>
                        <span class="fs-14">{{item.subtitle_2}}</span>
                    </div>
                </div>
                <div class="menu-con" :style="{display: `${activeMenuLine != -1 ? 'block' : 'none'}`}">
                    <div class="menu-con">
                        
                    </div>
                </div>
            </div>
            <swiper :width="1240" :height="500" :leftLeft="270" :btnTop="225" :imageArray="imageArray.data" ref="swiperCom"></swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { getIndexData, getIndexBanner } from '../api/api-rabbit';
    import swiper from '../components/swiper.vue';
    import { onMounted, reactive, ref } from 'vue';
    import type { Ref } from 'vue'

    // 横栏项数据接口
    interface IcrossBase {
        data: Array<Icross>
    }

    // 横栏项
    interface Icross {
        title: string;
        id: number
    }
    // 横栏项内容
    let crossBarArray:IcrossBase = reactive({data: []});

    interface IbannerBase {
        data: Array<string>
    }
    // banner图片地址
    let imageArray:IbannerBase = reactive({data: []});
    // 声明菜单栏内容接口
    interface Imenu {
        title: string;
        subtitle_1: string;
        subtitle_2: string;
    }
    interface IMenuBase {
        data: Array<Imenu>
    }
    // 菜单栏内容
    let menuArray:IMenuBase = reactive({data: []})
    let keyword = ref('');

    let hoverIndex:Ref<number> = ref(-1); // 当前移入的横栏项下标
    let isHover:Ref<boolean> = ref(false); // 横栏移入状态
    let outIndex:Ref<number> = ref(-1); // 当前移出横栏项的下标，在横栏弹窗鼠标移入时使用
    // 声明横栏弹出框数据接口
    interface Ibars {
        image: string;
        title: string;
    }
    interface IBarsBase {
        data: Array<Array<Ibars>>
    }
    let barsImageArray:IBarsBase = reactive({data: []})
    // 鼠标进入横栏项
    function mouseEnter(index:number){
        hoverIndex.value = index;
        isHover.value = true;
    }
    // 鼠标移出横栏项
    function mouseLeave(index:number){
        hoverIndex.value = -1;
        isHover.value = false;
        outIndex.value = index;
    }

    // 鼠标移入横栏弹出窗
    function lineMouseEnter(){
        isHover.value = true;
        hoverIndex.value = outIndex.value;
    }
    // 鼠标移出横栏弹出窗
    function lineMouseLeave(){
        isHover.value = false;
        hoverIndex.value = -1;
    }

    let activeMenuLine:Ref<number> = ref(1);
    // 鼠标移入菜单栏列表，与之下标匹配项背景色修改
    function menuLineMouseEnter(index: number){
        activeMenuLine.value = index;
    }

    // 鼠标移出整体菜单栏
    function menuBoxMouseOut(e:any){
        activeMenuLine.value = -1;
    }


    interface ImenuGoods {
        image: string;
        title: string;
        desc: string;
        price: number;
    }
    // 菜单栏右侧弹窗商品数据内容
    let menuGoodsArray: Array<Array<ImenuGoods>> = [
        [
            {
                image: 'src/assets/images/index/居家-1.png',
                title: '圆润大肚流线型耐热玻璃凉水壶',
                desc: '1.25L容量，耐冷耐热，通透好用',
                price: 79.00,
            },
            {
                image: 'src/assets/images/index/居家-2.png',
                title: '不烫手的茶杯双层隔热茶水杯绿茶杯',
                desc: '368°赏茶汤，108C不烫手',
                price: 49.00,
            },
            {
                image: 'src/assets/images/index/居家-3.png',
                title: '热销30w+清洗不用愁简约陶瓷马克杯',
                desc: '优质炫瓷，不易留渍',
                price: 19.90,
            },
            {
                image: 'src/assets/images/index/居家-4.png',
                title: '匠心手工羊脂玉白茶具礼盒6件套',
                desc: '礼盒套装，送礼佳品',
                price: 339.00,
            },
            {
                image: 'src/assets/images/index/居家-5.jpg',
                title: '真空红酒瓶塞带计时功能升级款',
                desc: '保鲜浪漫，留住口感',
                price: 339.00,
            },
            {
                image: 'src/assets/images/index/居家-6.png',
                title: '喝水也要好心情日本美浓烧和蓝系列马克杯',
                desc: '妙趣横生，经久耐用',
                price: 55.00,
            },
            {
                image: 'src/assets/images/index/居家-7.png',
                title: '让全家人喝上甜甜的水黑科技镁离子净水壶',
                desc: '德国净水黑科技，3.3L大容量',
                price: 178.00,
            },
            {
                image: 'src/assets/images/index/居家-8.png',
                title: '四重过滤添加矿物质镁离子滤芯',
                desc: '补充镁离子，改善口感',
                price: 169.00,
            },
            {
                image: 'src/assets/images/index/居家-9.jpg',
                title: '每一口都有七种肉，全价猫粮1.8千克',
                desc: '多肉零谷物，升级低便臭配方',
                price: 9.90,
            }
        ],
    ]

    onMounted(() => {
        // 获取首页顶部的相关数据，菜单栏、横栏等模块的数据
        getHomeTopData();
        // 获取首页顶部banner图片数据
        getHomeBanner();
    })

    // 获取首页顶部相关数据
    function getHomeTopData(){
        getIndexData().then(res => {
            res.data.result.forEach((item: any, Rindex: number) => {
                // 声明横栏项数据模板
                let crossObj: Icross = {
                    title: item.name,
                    id: item.id,
                }
                // 向横栏项中添加数据
                crossBarArray.data.push(crossObj);
                
                // 声明菜单栏内容数据模板
                let menuObj: Imenu = {
                    title: item.name,
                    subtitle_1: '',
                    subtitle_2: '',
                }
                // 声明横栏弹出框数据列表数组，用以储存同组弹出框数据
                let barsImageList: Array<Ibars> = [];
                item.children.forEach((temp: any, Cindex:number) => {
                    switch(Cindex){
                        case 0 : menuObj.subtitle_1 = temp.name;break;
                        case 1 : menuObj.subtitle_2 = temp.name;break;
                    }
                    // 声明横栏弹出框数据模板
                    let barsImageObj: Ibars = {
                        title: temp.name,
                        image: temp.picture
                    }
                    barsImageList.push(barsImageObj)
                })
                menuArray.data.push(menuObj)
                barsImageArray.data.push(barsImageList)
            });
        })
    }

    // 获取顶部banner
    function getHomeBanner(){
        getIndexBanner().then(res => {
            let banner: Array<string> = [];
            res.data.result.forEach((item: any, index: number) => {
                banner.push(item.imgUrl)
            })
            imageArray.data = banner;
        })
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
        box-sizing: border-box;
        top: 150px;
        z-index: 99;
        transition: all .2s linear .1s;
        box-shadow: 0 0 5px #cccccc;
        background-color: #ffffff;
        padding: 0 70px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }
    .linebox-item {
        width: 110px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .linebox-item img {
        width: 60px;
        height: 60px;
    }
    .linebox-item span {
        padding-top: 10px;
        font-size: 14px;
    }
    .hei-150 {
        height: 150px;
    }
    .hei-0 {
        height: 0px;
    }
    .swiperbox {
        position: relative;
    }
    .coverbox {
        width: 250px;
        height: 500px;
        position: absolute;
        display: flex;
        top: 0;
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
    .menu-line span {
        color: #ffffff;
        margin-right: 4px;
    }
    .menu-con {
        width: 990px;
        height: 500px;
        background-color: rgba(256, 256, 256, .5);
    }

    .fs-16 {
        font-size: 16px;
    }
    .fs-14 {
        font-size: 14px;
    }
</style>