<template>
    <div class="brand">
        <img class="image" :src="goods.image">
        <div class="info">
            <span class="text1">{{goods.place}}</span>
            <span class="text2">{{goods.name}}</span>
            <span class="text1">{{goods.desc}}</span>
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
.brand {
    width: 310px;
    height: 180px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 8px;
    margin: 0 10px 0 0;
    cursor: pointer;
}
.brand:hover {
    background-color: #e3f9f4;
}
.image {
    width: 120px;
    height: 158px;
}
.info {
    width: 158px;
    height: 158px;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
}
.text1 {
    margin-top: 10px;
    font-size: 14px;
    color: #999999;
}
.text2 {
    margin-top: 10px;
    font-size: 16px;
    color: #666666;
}
</style>