<template>
    <div class="swiper" :style="{width: `${width}px`, height: `${height}px`}">
        <img class="image" :style="{width: `${width}px`, height: `${height}px`}" src="../assets/images/index/banner1.jpg">
        
    </div>
</template>

<script lang="ts">
    export default {
        name: 'swiper',
        data(){
            return {

            }
        },
        props: {
            // 轮播图宽度
            width: {
                type: Number,
                default: 1000,
            },
            // 轮播图高度
            height: {
                type: Number,
                default: 400,
            },
            // 轮播图图片数组
            imageArray: {
                type: Object,
                default: () => []
            }
        },
        setup(){
            
        }
    }
</script>

<style>
    .swiper {
        position: relative;
        top: 0;
        left: 0;
    }
</style>