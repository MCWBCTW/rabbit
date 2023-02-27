<template>
    <div class="cru">
        <div class="cur-item" v-for="(item, o) in props.curmbsRouter" :key="o">
            <span class="title" :class="item.jumpFlag ? 'jump' : 'static'" @click="RouterJump(item.router, item.jumpFlag)">{{ item.title }}</span>
            <span class="iconfont icon-xiangyou icon" v-if="o != props.curmbsRouter.length - 1"></span>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { useRouter } from "vue-router"

    const router = useRouter();

    interface Icurmbs {
        title: string;
        router: string;
        jumpFlag: boolean
    }

    const props = defineProps({
        curmbsRouter: {
            type: Array<Icurmbs>,
            default: () => []
        }
    })
    

    function RouterJump(path: string, flag: boolean){
        if(flag){
            router.push({ path: path})
        }
    }
</script>


<style scoped>
    .cru {
        width: 1240px;
        height: 72px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .cur-item {
        display: flex;
        flex-direction: row;
    }
    .title {
        font-size: 14px;
        line-height: 14px;
    }
    .static {
        color: #333333;
    }
    .jump {
        color: #666666;
        cursor: pointer;
    }
    .jump:hover {
        color: #27ba9b;
    }
    .icon {
        font-size: 10px;
        line-height: 14px;
        margin: 0 4px;
    }
</style>