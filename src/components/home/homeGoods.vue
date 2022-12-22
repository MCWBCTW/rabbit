<template>
    <div class="home">
        <div class="imageinfo">
            <img :src="goods.image">
            <div class="info">
                <div class="left">{{ goods.name }}馆</div>
                <div class="right">{{ goods.info }}</div>
            </div>
        </div>
        <div class="goodsbox">
            <bigGoods v-for="(item, o) in goods.goods" :key="o" :goods="item" :type="3"></bigGoods>
        </div>
    </div>
</template>

<script setup lang="ts">
    import bigGoods from 'custom/bigGoods.vue';
    const props = defineProps({
        goods: {
            type: Object,
            default: {}
        }
    })
</script>

<style scoped>
    .home {
        width: 1240px;
        display: flex;
        flex-direction: row;
    }
    .imageinfo {
        width: 240px;
        height: 610px;
        margin-right: 10px;
        position: relative;
    }
    .imageinfo img {
        width: 240px;
        height: 610px;
    }
    .info {
        width: 188px;
        height: 66px;
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 0;
        top: 272px;
    }
    .left {
        width: 76px;
        height: 66px;
        background-color: rgba(0, 0, 0, .9);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #ffffff;
        font-weight: 400;
    }
    .right {
        width: 112px;
        height: 66px;
        background-color: rgba(0, 0, 0, .7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #ffffff;
        box-sizing: border-box;
        font-weight: 400;
        overflow: hidden;
    }
    .goodsbox {
        width: 990px;
        height: 610px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>