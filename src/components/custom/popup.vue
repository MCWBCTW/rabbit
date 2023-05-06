<template>
    <div class="pop" @click="bgClick" v-if="show" @mousewheel.stop 
        :style="{height: `${viewHeight}px`, width: `${viewWidth}px`, backgroundColor: `${isMask ? 'rgba(0, 0, 0, .5)' : 'transparent'}`}">
            <slot></slot>
    </div>
</template>


<script setup lang="ts">
    import { $emit } from '../../utils/tools'

    // 浏览器视口宽度
    const viewWidth: number = window.innerWidth;
    // 浏览器视口高度
    const viewHeight: number = window.innerHeight;




    const props = defineProps({
        // 弹窗显示状态
        show: {
            type: Boolean,
            default: false
        },
        // 点击背景是否关闭弹窗
        bgClose: {
            type: Boolean,
            default: true
        },
        isMask: {
            type: Boolean,
            default: true
        }
    })
    watch(
        () => props.show,
        (newV) => {
            // 显示弹窗时，禁止底层滚动
            if(newV){
                // 显示弹窗
                document.body.style.overflow = "hidden"
                document.addEventListener("mousewheel", (e) => { e.preventDefault() })
            } else {
                // 关闭弹窗
                document.body.style.overflow = ""
                document.removeEventListener("mousewheel", (e) => { e.preventDefault() })
            }
        }
    )
    let emit = defineEmits(["update:show"]);
    // 点击背景层
    function bgClick(){
        if(props.bgClose){
            emit("update:show",!props.show);
            closePopup();
        }
    }

    function closePopup(){
        // $emit('PopupToApp', false)
    }

</script>


<style scoped>
    .pop {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 999;
        overflow: scroll;
        box-sizing: border-box;

        padding-top: 15vh;

    }
    .pop::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
    }
</style>