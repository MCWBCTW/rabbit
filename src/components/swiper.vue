<template>
    <div class="swiper" v-if="type == 1" :style="{width: `${width}px`, height: `${height}px`}" @mouseenter="mouseEnter" @mouseleave="mouseOut">
        <img :class="imageShowIndex == Number(index) ? 'tran op-1' : 'op-0'" v-for="(item, index) in imageArray" :key="index" :src="item"
         :style="{width: `${width}px`, height: `${height}px`}">
        <div class="btnbox" v-show="isHover" :style="{left: `${leftLeft}px`, top: `${btnTop}px`}" @click="bannerReduce">
            <span class="iconfont icon-xiangzuo1"></span>
        </div>
        <div class="btnbox" v-show="isHover" :style="{right: `${rightRight}px`, top: `${btnTop}px`}" @click="bannerAdd">
            <span class="iconfont icon-xiangyou"></span>
        </div>
        <div class="linebtn">
            <div :class="imageShowIndex == Number(index) ? 'white' : 'grey'"  v-for="(item, index) in imageArray" :key="index" @click="choiceBanner(Number(index))"></div>
        </div>
    </div>
    <div class="swiper-2" v-else-if="type == 2" :style="{width: `${width * imageArray.length}px`, height: `${height}px`}">
		<div class="swiper-2-box" :style="{width: `${width}px`, height: `${height}px`, right: `${paddingDistance}px`}">
            <img class="swiper-2-img" v-for="(item, o) in imageArray" :key="o" :src="item.image">
        </div>
	</div>
</template>

<script lang="ts" setup>
    import { defineComponent, onMounted, ref } from 'vue'
    import type { Ref } from 'vue'
    onMounted(() => {
        loopFun();
    })
    const props = defineProps({
        // 轮播图宽度，整体宽度，type=2时，不是图片的宽度
        width: {
            type: Number,
            default: 1000,
        },
        // 轮播图高度，整体高度，type=2时，不是图片的高度
        height: {
            type: Number,
            default: 400,
        },
        // 轮播图图片数组
        imageArray: {
            type: Object,
            default: () => []
        },
        // 轮播图类型
        type: {
            type: Number,
            default: 1
        },
        // 左侧按钮距左侧的距离
        leftLeft: {
            type: Number,
            default: 20,
        },
        // 右侧按钮距右侧的距离
        rightRight: {
            type: Number,
            default: 20,
        },
        // 按钮上方的距离
        btnTop: {
            type: Number,
            default: 0,
        },
		// type == 2时，右侧padding值，做轮播效果
		paddingDistance: {
			type: Number,
			default: 0,
		}
    })
    // 声明循环函数的返回值
    let timer:any = ref(null);
    // 声明当前显示的图片下标
    let imageShowIndex:Ref<number> = ref(0);
    // 声明鼠标是否移入图片标志
    let isHover:Ref<boolean> = ref(false)

    // 循环，切换banner图片
    function loopFun(){
        if(timer){
            clearInterval(timer)
        }
        timer = setInterval(() => {
            switchBanner(1);
        }, 3000)
    }
    // 切换图片
    function switchBanner(num:number){
        if(Math.sign(num) == 1){
            // 下一张
            if(imageShowIndex.value == props.imageArray.length - 1){
                imageShowIndex.value = 0;
            } else {
                imageShowIndex.value += num;
            }
        } else {
            // 上一张
            if(imageShowIndex.value == 0){
                // 当前为第一张，切换到最后一张
                imageShowIndex.value = props.imageArray.length - 1;
            } else {
                imageShowIndex.value += num;
            }
        }
    }
    // 鼠标移入图片，清除循环计时器
    function mouseEnter(){
        clearInterval(timer);
        isHover.value = true;
    }

    // 鼠标移出，开始循环
    function mouseOut(){
        loopFun();
        isHover.value = false;
    }

    // banner切换至上一张
    function bannerReduce(){
        switchBanner(-1);
    }
    // banner切换至下一章
    function bannerAdd(){
        switchBanner(1);
    }

    // 选择banner
    function choiceBanner(index:number){
        imageShowIndex.value = index;
    }
    
</script>

<style>
    .swiper {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 97;
    }
    .swiper img {
        position: absolute;
    }
    .op-0 {
        opacity: 0;
    }
    .op-1 {
        opacity: 1;
    }
    .tran {
        transition: opacity .5s linear;
    }
    .btnbox {
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, .2);
        position: absolute;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .btnbox span {
        color: #ffffff;
        font-size: 20px;
    }
    .linebtn {
        position: absolute;
        bottom: 20px;
        display: flex;
    }
    .linebtn div {
        width: 15px;
        height: 15px;
        border-radius: 100px;
        margin: 0 10px;
        cursor: pointer;
    }
    .white {
        background-color: #ffffff;
    }
    .grey {
        background-color: rgba(0, 0, 0, .2);
    }
    .swiper-2 {
        display: flex;
        flex-direction: row;
		flex-wrap: nowrap;
        overflow: hidden;
		position: relative;
    }
    .swiper-2-box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
		position: absolute;
		transition: all .5s linear;
    }
    .swiper-2-img {
        width: 240px;
        height: 305px;
		margin-right: 10px;
    }
</style>