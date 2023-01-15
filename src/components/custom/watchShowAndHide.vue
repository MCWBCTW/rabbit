<template>
    <div :id="id">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
    /**
     * 本组件功能为监听 插入组件 的显示与隐藏状态
     * 借助于 IntersectionObserver api
     * 
     * 在组件挂载完成后注册监听组件 显示与隐藏 时触发的事件
     * 通过 显示（appear）、隐藏（disappear）事件返回给父级，在父级中针对这两个事件接收后处理
     * 
     * 显示（appear）、隐藏（disappear）事件会携带一个标识，此标识在父级中定义，默认值为 'discern' ，建议自定义标识，以便于父级更仔细操作父级中多个此组件的情况
    */
    import { onMounted, onUnmounted } from "@vue/runtime-core";
    const emits = defineEmits(['appear', 'disappear'])
    const props = defineProps({
        discern: {
            type: String,
            default: 'discern'
        }
    })

    // 生成随机的id值，值为长度为8的随机字母组成
    function createRandomID(){
        let id = '';
        for(let i = 0; i < 8; i++){
            id += String.fromCharCode(
                Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)
            );
        }
        return id
    }
    const id = createRandomID(); // 本组件的id值，用以注册显示与隐藏触发的事件

    // 显示与隐藏回调事件
    function watchCallback(e: any){
        /**
         * e:
         * boundingClientRect 目标元素的矩形信息\
         * intersectionRatio 相交区域和目标元素的比例值 intersectionRect/boundingClientRect 不可见时小于等于0\
         * intersectionRect 目标元素和视窗（根）相交的矩形信息 可以称为相交区域\
         * isIntersecting 目标元素当前是否可见 Boolean值 可见为true\
         * rootBounds 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息\
         * target 观察的目标元素\
         * time 返回一个记录从`IntersectionObserver`的时间到交叉被触发的时间的时间戳
         */
        if (e[0].isIntersecting === true) {
            // 组件显示了
            emits('appear', props.discern);
        } else {
            // 组件隐藏了
            emits('disappear', props.discern);
        }
    }
    const observer = new IntersectionObserver(watchCallback, {
        // root: document.querySelector('.box'), // 不填，默认为浏览器的视口
        threshold: [0],
        // rootMargin: '10px 10px 10px 10px', // 只有在 rootMargin 为空的时候才是绝对的视窗
    })
    // IntersectionObserver 讲解参考： https://juejin.cn/post/6989995223988305934
    // 注册显示与隐藏触发事件
    function register(){
        let dom = document.getElementById(id);
        observer.observe(dom as Element)
    }
    // 注销监听事件
    function cancellation(){
        observer.disconnect()
    }
    onMounted(() => {
        register();
    })
    onUnmounted(() => {
        cancellation();
    })
</script>