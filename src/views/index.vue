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
                    <span class="barsText" @mouseenter="mouseEnter(1)" @mouseleave="mouseLeave(1)">居家</span>
                    <span class="barsText" @mouseenter="mouseEnter(2)" @mouseleave="mouseLeave(2)">美食</span>
                    <span class="barsText" @mouseenter="mouseEnter(3)" @mouseleave="mouseLeave(3)">服饰</span>
                    <span class="barsText" @mouseenter="mouseEnter(4)" @mouseleave="mouseLeave(4)">母婴</span>
                    <span class="barsText" @mouseenter="mouseEnter(5)" @mouseleave="mouseLeave(5)">个护</span>
                    <span class="barsText" @mouseenter="mouseEnter(6)" @mouseleave="mouseLeave(6)">严选</span>
                    <span class="barsText" @mouseenter="mouseEnter(7)" @mouseleave="mouseLeave(7)">数码</span>
                    <span class="barsText" @mouseenter="mouseEnter(8)" @mouseleave="mouseLeave(8)">运动</span>
                    <span class="barsText" @mouseenter="mouseEnter(9)" @mouseleave="mouseLeave(9)">杂项</span>
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
                <div class="linebox-item" v-for="(item, index) in barsImageArray[hoverIndex-1]" :key="index">
                    <img :src="item.image">
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="swiperbox">
            <div class="coverbox" @mouseleave="menuBoxMouseOut">
                <div class="menu">
                    <div class="menu-line" :style="{backgroundColor: `${activeMenuLine == index ? '#27ba9b' : 'transparent'}`}" 
                        v-for="(item, index) in menuArray" :key="index" @mouseenter="menuLineMouseEnter(index)">
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
            <swiper :width="1240" :height="500" :leftLeft="270" :btnTop="225" :imageArray="imageArray" ref="swiperCom"></swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { getIndexData } from '../api/api-index';
    import swiper from '../components/swiper.vue';
    import { onMounted, reactive, ref } from 'vue';
    import type { Ref } from 'vue'

    // 基本reactive数据接口
    interface Iract {
        data: Array<any>
    }

    // 横栏项
    interface Icross {
        title: string;
        id: number
    }
    // 横栏项内容
    let crossBarArray:Iract = reactive({data: []});

    // banner图片地址
    let imageArray:Array<string> = reactive([
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
    let menuArray:Array<Imenu> = reactive([
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

    let hoverIndex:Ref<number> = ref(-1); // 当前移入的横栏项下标
    let isHover:Ref<boolean> = ref(false); // 横栏移入状态
    let outIndex:Ref<number> = ref(-1); // 当前移出横栏项的下标，在横栏弹窗鼠标移入时使用
    interface Ibars {
        image: string;
        title: string;
    }
    let aaa: Array<Array<Ibars>> = reactive([]);
    let barsImageArray: Array<Array<Ibars>> = [
        [
            {
                title: '茶咖酒具',
                image: '/src/assets/images/index/茶咖酒具.png',
            },
            {
                title: '水具杯壶',
                image: '/src/assets/images/index/水具杯壶.png',
            },
            {
                title: '宠物食品',
                image: '/src/assets/images/index/宠物食品.png',
            },
            {
                title: '宠物用品',
                image: '/src/assets/images/index/宠物用品.png',
            }
        ],
        [
            {
                title: '网易黑猪',
                image: '/src/assets/images/index/网易黑猪.png',
            },
            {
                title: '水产海鲜',
                image: '/src/assets/images/index/水产海鲜.png',
            },
            {
                title: '全球美食',
                image: '/src/assets/images/index/全球美食.png',
            },
            {
                title: '冷冻冷藏',
                image: '/src/assets/images/index/冷冻冷藏.png',
            }
        ],
        [
            {
                title: '室外拖鞋',
                image: '/src/assets/images/index/室外拖鞋.png',
            },
            {
                title: '春夏潮鞋',
                image: '/src/assets/images/index/春夏潮鞋.png',
            },
            {
                title: '飞织系列',
                image: '/src/assets/images/index/飞织系列.png',
            },
            {
                title: '一脚蹬懒人系列',
                image: '/src/assets/images/index/一脚蹬懒人系列.png',
            }
        ],
        [
            {
                title: 'T恤/polo/衬衫',
                image: '/src/assets/images/index/T恤polo衬衫.png',
            },
            {
                title: '卫衣/毛衫',
                image: '/src/assets/images/index/卫衣毛衫.png',
            },
            {
                title: '外套/套装',
                image: '/src/assets/images/index/外套套装.png',
            },
            {
                title: '连体衣/礼盒',
                image: '/src/assets/images/index/连体衣礼盒.png',
            }
        ],
        [
            {
                title: '家庭清洁',
                image: '/src/assets/images/index/家庭清洁.png',
            },
            {
                title: '浴室用品',
                image: '/src/assets/images/index/浴室用品.png',
            },
            {
                title: '餐厨清洁',
                image: '/src/assets/images/index/餐厨清洁.png',
            },
            {
                title: '毛巾浴巾',
                image: '/src/assets/images/index/毛巾浴巾.png',
            }
        ],
        [
            {
                title: '卫浴用品',
                image: '/src/assets/images/index/卫浴用品.png',
            },
            {
                title: '高级珠宝',
                image: '/src/assets/images/index/高级珠宝.png',
            },
            {
                title: '时尚搭配',
                image: '/src/assets/images/index/时尚搭配.png',
            },
            {
                title: '数码电器',
                image: '/src/assets/images/index/数码电器.png',
            }
        ],
        [
            {
                title: '影音娱乐',
                image: '/src/assets/images/index/影音娱乐.png',
            },
            {
                title: '乐器',
                image: '/src/assets/images/index/乐器.png',
            },
            {
                title: '车载用品',
                image: '/src/assets/images/index/车载用品.png',
            },
            {
                title: '办公文具',
                image: '/src/assets/images/index/办公文具.png',
            }
        ],
        [
            {
                title: '登机箱',
                image: '/src/assets/images/index/登机箱.png',
            },
            {
                title: '托运箱',
                image: '/src/assets/images/index/托运箱.png',
            },
            {
                title: '出行配件',
                image: '/src/assets/images/index/出行配件.png',
            },
            {
                title: '户外运动鞋',
                image: '/src/assets/images/index/户外运动鞋.png',
            }
        ],
        [
            {
                title: '乐器杂项',
                image: '/src/assets/images/index/乐器.png',
            }
        ]
    ];
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
        getIndexData().then(res => {
            console.log(res);
            console.log(crossBarArray.data)
            res.data.result.forEach((item: any) => {
                let crossObj: Icross = {
                    title: '',
                    id: 0,
                }
                crossObj.title = item.name;
                crossObj.id = item.id;
            });

        })
    })
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