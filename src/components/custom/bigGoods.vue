<template>
    <div class="goods-1" v-if="type == 1">
        <img class="image-1" :src="goods.image">
        <div class="info-1" :style="{backgroundColor: `${infoBG}`}">
            <div class="title-1">{{goods.desc}}</div>
            <span class="price-1" :style="{color: `${priceColor}`}">￥{{goods.price}}</span>
        </div>
    </div>
    <div class="goods-1" v-else-if="type == 2">
        <img class="image-1" :src="goods.image">
        <div class="info-1" :style="{backgroundColor: `${infoBG}`}">
            <div class="title-1">{{goods.title}}</div>
            <span class="desc-1" :style="{color: `${priceColor}`}">{{goods.desc}}</span>
        </div>
    </div>
    <div class="goods-3" v-else-if="type == 3" @mouseover="goodsEnter" @mouseout="goodsOut">
        <img :src="goods.image">
        <p class="name-3">{{ goods.name }}</p>
        <p class="desc-3">{{ goods.desc }}</p>
        <div class="price-3">￥{{ goods.price }}</div>
        <div class="hoverbox" :class="hoverFlag ? 'goodsHover' : 'goodsOut'">
            <span class="hoverbox-title">找相似</span>
            <span class="hoverbox-sub">发现更多宝贝 ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue'
    const props = defineProps({
        // 商品显示类型
        type: {
            type: Number,
            default: 1
        },
        // 商品数据
        goods: {
            type: Object,
            default: {}
        },
        // 信息模块背景色
        infoBG: {
            type: String,
            default: '#ffffff'
        },
		// 信息价格颜色
        priceColor: {
            type: String,
            default: '#333333'
        }
    })

    let hoverFlag: Ref<boolean> = ref(false);
    // 鼠标移入商品
    function goodsEnter(){
        hoverFlag.value = true;
    }
    function goodsOut(){
        hoverFlag.value = false;
    }
</script>

<style scoped>
.goods-1 {
    width: 306px;
    display: flex;
    flex-direction: column;
    transition: all .5s;
	cursor: pointer;
	box-sizing: border-box;
}
.goods-1:hover {
    transform: translate3d(0,-3px,0);
    box-shadow: 0 3px 8px rgb(0, 0, 0, .2);
}
.image-1 {
    width: 306px;
    height: 306px;
}
.info-1 {
    width: 306px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.title-1 {
    font-size: 22px;
    width: 246px;
    box-lines: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-align: center;
}
.price-1 {
    font-size: 22px;
}
.desc-1 {
    font-size: 18px;
}

.goods-3 {
    width: 240px;
    height: 300px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 30px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .4s ease-out;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
}
.goods-3:hover {
    border: 1px solid #27ba9b;
}
.goods-3 img {
    width: 160px;
    height: 160px;
}
.name-3 {
    margin-top: 6px;
    margin-bottom: 0;
    font-size: 16px;
    height: 44px;
    word-break: break-all;
    line-clamp: 2;
}
.desc-3 {
    width: 180px;
    height: 22px;
    color: #666666;
    margin-top: 6px;
    margin-bottom: 0;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.price-3 {
    width: 180px;
    font-size: 20px;
    color: #cf4444;
    margin-top: 10px;
    margin-bottom: 0;
}
.hoverbox {
    width: 238px;
    height: 86px;
    background-color: #27ba9b;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
}
.hoverbox-title {
    font-size: 18px;
    border-bottom: 1px solid #fff;
    line-height: 40px;
    padding: 0 40px;
    margin-top: 5px;
    color: #ffffff;
}
.hoverbox-sub {
    font-size: 14px;
    color: #ffffff;
    margin-top: 5px;
}
.goodsHover {
    bottom: 0;
    transition: all .4s ease-out;
}
.goodsOut {
    transition: all .4s ease-out;
    bottom: -86px;
}
</style>