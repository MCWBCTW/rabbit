<template>
    <div class="index">
        <watchShowAndHide style="width: 100%;" @appear="headAppear" @disappear="headDisappear">
            <div class="head">
                <div class="titlebox">
                    <span class="title" v-if="!isLogin" @click="toLogin">请先登录</span>
                    <span class="title iconfont icon-jurassic_user icon" v-else @click="toMyCenter">{{ userLoginBase.user }}</span>
                    <span class="title bor-l" v-if="!isLogin">免费注册</span>
                    <span class="title bor-l" v-else @click="toLogin">退出登录</span>
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
        </watchShowAndHide>
        <div :class="showTop ? 'top-floor top-hide' : 'top-floor top-show'">
            <div class="top-content">
                <img class="headImage2" src="/images/index_logo.png">
                <span class="barsText marL-40">首页</span>
                <span class="barsText marL-40" v-for="(item, index) in crossBarArray.data" :key="index">{{item.title}}</span>
                <span class="barsText2 marL-40">|</span>
                <span class="barsText marL-40">品牌</span>
                <span class="barsText marL-40">专题</span>
            </div>
        </div>
        <div class="bars">
            <div class="barsbox">
                <img class="headImage" src="/images/index_logo.png">
                <div class="textbox">
                    <span class="barsText" @click="toHome">首页</span>
                    <span class="barsText" v-for="(item, index) in crossBarArray.data" :key="index"
                        @mouseenter="mouseEnter(Number(index)+1)" @mouseleave="mouseLeave(Number(index)+1)">{{item.title}}</span>
                </div>
                <div class="searchbox">
                    <span class="iconfont icon-fangdajing searchLogo"></span>
                    <input type="text" class="searchInput" v-model="keyword" placeholder="搜一搜">
                </div>
                <div class="cartbox" @click="toCart">
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
        <!-- 轮播图，数据由于和上方菜单栏数据在同一接口下，未抽离至 homemiddle 组件中，但是限时隐藏时与此组件保持一致 -->
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
                        <div class="title-line">
                            <span class="title-line-title">{{(activeMenuLine == 9 ? '品牌' : '分类')}}推荐</span>
                            <span class="title-line-desc">根据您的购买或浏览记录推荐</span>
                        </div>
                        <div class="good-box2" v-if="activeMenuLine == 9">
                            <!-- 品牌推荐 -->
                            <miniBrand v-for="(item, index) in brandArray.data" :key="index" :goods="item"></miniBrand>
                        </div>
                        <div class="good-box" v-else :style="{height: activeMenuLine == 8 ? '270px' : '405px'}">
                            <!-- 分类推荐 -->
                            <miniGoods v-for="(item, index) in menuGoodsArray.data[activeMenuLine]" :key="index" :goods="item"></miniGoods>
                        </div>
                    </div>
                </div>
            </div>
            <swiper :type="1" :width="1240" :height="500" :leftLeft="270" :btnTop="225" :imageArray="imageArray.data" ref="swiperCom"></swiper>
        </div>

        <router-view></router-view>

        <!-- 首页底部描述信息内容 -->
        <bottomInfo></bottomInfo>
    </div>
</template>

<script setup lang="ts">
    import { getIndexData, getIndexBanner, getBrandData, getGoodGoods, getHotGoods, getHotBrandData, getIndexGoods, getIndexSpecial } from '../api/api-rabbit';
    import type { Ref } from 'vue'
    import { useRouter, useRoute } from "vue-router"
    import { decryptObj } from '../utils/tools'
    // import { UsersStore } from '../store/user'

    const router = useRouter();
    const route = useRoute();

    interface Ilogin {
        user: string;
        password: string;
    }
    let isLogin: Ref<boolean> = ref(false);
    let userLoginBase: Ilogin = reactive({
        user: '',
        password: '',
    });
    // 当路由参数不为空时，则存在登录的用户，顶部区域显示登录状态
    if(route.query.user){
        isLogin.value = true;
        let base = decryptObj(route.query); // 由于路由传参时加密了，此处解密
        userLoginBase.user = base.user;
        userLoginBase.password = base.password;
    } else {
        isLogin.value = false;
    }
    // 获取首页顶部的相关数据，菜单栏、横栏等模块的数据
    getHomeTopData();
    // 获取首页顶部banner图片数据
    getHomeBanner();
    // 获取首页品牌数据
    getBrand();

    // 横栏项数据接口
    interface IcrossBase {
        data: Array<Icross>
    }

    // 横栏项
    interface Icross {
        title: string;
        id: number;
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

    let activeMenuLine:Ref<number> = ref(-1);
    // 鼠标移入菜单栏列表，与之下标匹配项背景色修改
    function menuLineMouseEnter(index: number){
        activeMenuLine.value = index;
    }

    // 鼠标移出整体菜单栏
    function menuBoxMouseOut(){
        activeMenuLine.value = -1;
    }

    interface ImenuGoodsBase {
        data: Array<Array<ImenuGoods>>
    }
    interface ImenuGoods {
        image: string;
        title: string;
        desc: string;
        price: string;
    }
    // 菜单栏右侧弹窗商品数据内容
    let menuGoodsArray: ImenuGoodsBase = reactive({data: []});


    interface Ibrand {
        image: string;
        place: string;
        name: string;
        desc: string;
    }
    interface IbrandBase {
        data: Array<Ibrand>
    }
    // 品牌数据
    let brandArray: IbrandBase = reactive({data: []});


    
    let showTop: Ref<boolean> = ref(false);
    // 头部区域显示
    function headAppear(){
        showTop.value = true;
    }

    // 头部区域隐藏
    function headDisappear(){
        showTop.value = false;
    }


    // 获取首页顶部相关数据
    function getHomeTopData(){
        getIndexData().then(res => {
            // 声明商品数据
            res.data.result.forEach((item: any) => {
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

                
                let goodsArray: Array<ImenuGoods> = [];
                item.goods.forEach((temp: any) => {
                    let good: ImenuGoods = {
                        image: temp.picture,
                        title: temp.name,
                        desc: temp.desc,
                        price: temp.price,
                    }
                    goodsArray.push(good)
                })
                menuGoodsArray.data.push(goodsArray)
            });
            menuArray.data.push({
                title: '品牌',
                subtitle_1: '品牌推荐',
                subtitle_2: '',
            })
        })
    }

    // 获取顶部banner
    function getHomeBanner(){
        getIndexBanner().then(res => {
            let banner: Array<string> = [];
            res.data.result.forEach((item: any) => {
                banner.push(item.imgUrl)
            })
            imageArray.data = banner;
        })
    }

    // 获取首页品牌
    function getBrand(){
        getBrandData().then(res => {
            res.data.result.forEach((item: any) => {
                let brandObj: Ibrand = {
                    image: item.picture,
                    place: item.place,
                    name: item.name,
                    desc: item.desc,
                }
                brandArray.data.push(brandObj)
            })
        })
    }




    // 避免所有逻辑数据都放在一起，过于杂乱，下方均为用户操作前往其他页面的逻辑 
    // 前往登录页面
    function toLogin(){
        router.push({ path:'/login'})
    }

    // 前往我的个人中心页面
    function toMyCenter(){
        // 仅替换首页中部区域内容即可，路由并未发生改变
    }

    // 点击购物车按钮，查看购物车信息
    function toCart(){
        router.push({ path:'/cart'})
    }

    // 返回首页
    function toHome(){
        router.push({ path:'/'})
    }
</script>

<style scoped>
    .index {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
    }
    .top-floor {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        position: fixed;
        display: flex;
        justify-content: center;
    }
    .top-hide {
        top: -80px;
        z-index: 999;
        transition: all .2s;
    }
    .top-show {
        top: 0;
        z-index: 999;
        transition: all .2s;
    }
    .top-content {
        width: 1240px;
        height: 80px;
        display: flex;
        align-items: center;
    }
    /* 顶部标题 */
    .head {
        width: 100%;
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
        width: 100%;
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
    .headImage2 {
        height: 80px;
        cursor: pointer;
        margin-left: 40px;
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
    .barsText2 {
        font-size: 16px;
        line-height: 32px;
        color: #27ba9b;
        cursor: pointer;
        font-weight: 600;
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
		cursor: pointer;
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
    .title-line {
        width: 960px;
        height: 82px;
        margin: 0 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .title-line-title {
        font-size: 20px;
    }
    .title-line-desc {
        font-size: 16px;
        color: #666666;
    }
    .good-box {
        width: 960px;
        margin: 0 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .good-box2 {
        width: 960px;
        height: 390px;
        margin: 0 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .fs-16 {
        font-size: 16px;
    }
    .fs-14 {
        font-size: 14px;
    }
    .marL-40 {
        margin-left: 40px;
    }
</style>