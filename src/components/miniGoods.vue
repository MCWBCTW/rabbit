<template>
    <div class="goods">
        <img class="goods-image" :src="goods.image">
        <div class="info">
            <span class="title">{{goods.title}}</span>
            <span class="desc">{{goods.desc}}</span>
            <div class="priceline">
                <span class="priceLogo">￥</span>
                <span class="price">{{goods.price}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        // 当前的商品详细数据
        goods: {
            type: Object,
            default: {}
        }
    })
</script>

<style scoped>
.goods {
    width: 305px;
    height: 118px;
    border-radius: 8px;
    background-color: #ffffff;
    margin: 0 15px 15px 0;
    padding: 10px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    cursor: pointer;
}
.goods:hover {
    background-color: #e3f9f4;
}
.goods-image {
    width: 95px;
    height: 95px;
}
.info {
    width: 180px;
    height: 95px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.title {
    font-size: 16px;
    color: #666666;
    box-lines: 2;
	text-overflow: ellipsis;
    line-height: 22px;
    overflow: hidden;
    word-break: break-all;
}
.desc {
    font-size: 14px;
    color: #999999;
    box-lines: 1;
	text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.priceline {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}
.priceLogo {
    font-size: 18px;
    color: #cf4444;
}
.price {
    font-size: 22px;
    color: #cf4444;
}
</style>