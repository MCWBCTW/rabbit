<template>
    <div class="goods-1" v-if="type == 1">
        <img class="image-1" :src="goods.image">
        <div class="info-1">
            <div class="title-1">{{goods.desc}}</div>
            <span class="price-1">￥{{goods.price}}</span>
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
        }
    })
</script>

<style scoped>
.goods-1 {
    width: 306px;
    display: flex;
    flex-direction: column;
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
}
.title-1 {
    font-size: 22px;
    width: 246px;
    box-lines: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}
</style>