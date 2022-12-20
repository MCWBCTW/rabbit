<template>
    <div class="descline">
        <div class="desc-left">
            <span class="desc-title">{{ title }}</span>
            <span class="desc-subtitle">{{ subtitle }}</span>
        </div>
        <div class="rightline">
            <slot></slot>
            <div class="desc-right" v-if="showMore">
                <span class="desc-to">查看全部</span>
                <span class="iconfont icon-xiangyou logo-right"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        showMore: {
            type: Boolean,
            default: false
        }
    })
</script>

<style scoped>
    .descline {
        padding: 40px 0;
        width: 1240px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .desc-left {
        display: flex;
        align-items: flex-end;
    }
    .desc-title {
        font-size: 32px;
        color: #333333;
    }
    .rightline {
        display: flex;
        align-items: flex-end;
    }
    .desc-right {
        display: flex;
        align-items: flex-end;
        cursor: pointer;
        color: #999999;
    }
    .desc-right:hover {
        color: #27ba9b;
    }
    .desc-subtitle {
        font-size: 16px;
        color: #999999;
        margin-left: 20px;
    }
    .desc-to {
        font-size: 16px;
    }
    .logo-right {
        font-size: 14px;
        margin-bottom: 2px;
    }
</style>