<template>
    <div class="special">
        <div class="infobox">
            <img class="image" :src="special.image">
            <div class="box">
                <div class="info">
                    <div class="titlebox">
                        <span class="title">{{ special.title }}</span>
                        <span class="desc">{{ special.desc }}</span>
                    </div>
                    <span class="price">￥{{ special.price }}起</span>
                </div>
            </div>
        </div>
        <div class="descbox">
            <div class="level">
                <span class="icon-aixin iconfont logo"></span>
                <span class="number marR-25">{{ special.collect }}</span>
                <span class="icon-chakan iconfont logo"></span>
                <span class="number">{{ special.view }}</span>
            </div>
            <div class="level">
                <span class="icon-wode iconfont logo"></span>
                <span class="number marR-5">{{ special.reply }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        special: {
            type: Object,
            default: {}
        }
    })
</script>

<style scoped>
    .special {
        width: 404px;
        height: 360px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: all .5s;
    }
    .special:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0, 0, 0, .2);
    }
    .infobox {
        width: 404px;
        height: 288px;
        position: relative;
    }
    .box {
        position: absolute;
        bottom: 0;
        width: 404px;
        height: 144px;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .8));
        display: flex;
        align-items: flex-end;
    }
    .info {
        width: 404px;
        height: 72px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px 0 16px;
        box-sizing: border-box;
    }
    .titlebox {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .title {
        width: 270px;
        color: #fff;
        font-size: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .desc {
        width: 270px;
        font-size: 19px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .price {
        padding: 2px 4px;
        color: #cf4444;
        font-size: 17px;
        background-color: #ffffff;
        border-radius: 2px;
    }
    .image {
        width: 404px;
        height: 288px;
    }
    .descbox {
        width: 404px;
        height: 72px;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .level {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .logo {
        margin-right: 5px;
        color: #999999;
        font-size: 16px;
    }
    .number {
        font-size: 16px;
    }
    .marR-25 {
        margin-right: 25px;
    }
    .marR-5 {
        margin-right: 5px;
    }
</style>