<template>
    <div class="pop" @click="bgClick" v-if="show" @mousewheel.stop>
        <div class="pop-box" style="height: 200px;width: 200px;overflow: scroll;">
            <slot></slot>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { Ref } from '@vue/reactivity';
    import { $emit } from '../../utils/tools'
    const props = defineProps({
        show: {
            type: Boolean,
            default: false
        },
        bgClose: {
            type: Boolean,
            default: false
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
        $emit('PopupToApp', false)
    }

</script>


<style scoped>
    .pop {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }
    .pop-box::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
    }
</style>