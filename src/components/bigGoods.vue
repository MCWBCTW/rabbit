<template>
    <div class="goods-1" v-if="type == 1">
        <img class="image-1" :src="goods.image">
        <div class="info-1" :style="{backgroundColor: `${infoBG}`}">
            <!-- 首页，新鲜好物为desc，人气推荐为title，两种数据中，好物存在price参数，人气推荐不存在price -->
            <div class="title-1">{{goods.price ? goods.desc : goods.title}}</div>
            <span class="price-1" v-if="goods.price" :style="{color: `${priceColor}`}">￥{{goods.price}}</span>
            <span class="desc-1" v-else :style="{color: `${priceColor}`}">{{goods.desc}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        priceColor: {
            type: String,
            default: '#333333'
        }
    })
</script>

<style scoped>
.goods-1 {
    width: 306px;
    display: flex;
    flex-direction: column;
    transition: all .5s;
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
</style>