<template>
    <div class="line">
        <div class="temp temp-1">
            <div class="checkbox" :class="check ? 'check' : 'uncheck'" @click="checkBox">
                <span class="hook" v-show="check">√</span>
            </div>
        </div>
        <div class="temp ac temp-2">
            <div class="image"></div>
            <div class="info">
                <p class="goods-title">{{ goods.title }}</p>
                <div class="type-line">
                    <p class="type-desc" v-for="(type, o) in goods.types" :key="o">{{ type.name }}：{{  }}</p>
                    <span class="iconfont icon-xiangyou type-icon"></span>
                </div>
            </div>
        </div>
        <div class="temp fcc temp-3">
            <span class="unit-price">￥{{ goods.unitPrice }}</span>
        </div>
        <div class="temp fcc temp-4">
            <div class="count">
                <div class="count_btn fcc bor-r" @click="editNum(-1)">-</div>
                <div class="count_input fcc">{{ goods.num }}</div>
                <div class="count_btn fcc bor-l" @click="editNum(1)">+</div>
            </div>
        </div>
        <div class="temp fcc temp-4">
            <span class="all-price">￥{{ allPrice }}</span>
        </div>
        <div class="temp jc temp-5">
            <span class="operate-1" @click="collectGoods">移入收藏夹</span>
            <span class="operate-2" @click="deleteGoods">删除</span>
            <span class="operate-1" @click="findResemble">找相似</span>
        </div>
    </div>
</template>


<script setup lang="ts">
    import type { Ref, ComputedRef } from 'vue';


    const props = defineProps({
        // 当前商品数据
        goods: {
            type: Object,
            default: () => {}
        },
        // 当前商品所属下标
        index: {
            type: Number,
            default: 0,
        },
        // 当前商品数量
        num: {
            type: Number,
            default: 0,
        },
        // 当前商品是否勾选
        check: {
            type: Boolean,
            default: 0,
        },
    })

    const emit = defineEmits(['update:num', 'update:check', 'updataInfo', 'deleteGoods', 'collectGoods']);

    // 商品总价
    let allPrice: ComputedRef<number> = computed(() => {
        let res: number = props.goods.num * props.goods.unitPrice;
        res = Number(res.toFixed(2));
        return res
    })
    
    // 减少数量
    function editNum(num: number){
        if(num < 0 && props.goods.num == 1){
            // 数量为1时不能减少
            return
        }
        let originNum: number = props.num;
        originNum += num;
        emit('update:num', originNum);
        emit('updataInfo');
    }

    // 勾选商品
    function checkBox(){
        let originCheck: boolean = props.check;
        originCheck = !originCheck;
        emit('update:check', originCheck);
    }

    // 删除当前商品
    function deleteGoods(){
        emit('deleteGoods', props.index);
    }

    // 加入收藏夹
    function collectGoods(){
        emit('collectGoods', props.index);
    }

    // 找相似
    function findResemble(){
        
    }
</script>


<style scoped>
    .temp {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .temp-1 {
        width: 120px;
        padding: 10px 10px 10px 30px;
        box-sizing: border-box;
    }
    .checkbox {
        width: 13px;
        height: 13px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        margin-right: 3px;
        cursor: pointer;
    }
    .hook {
        color: #27ba9b;
        font-size: 12px;
        line-height: 13px;
    }
    .check {
        border: 1px solid #27ba9b;
    }
    .uncheck {
        border: 1px solid #999999;
    }
    .checkText {
        color: #27ba9b;
        font-size: 16px;
        font-weight: 400;
    }
    .uncheckText {
        color: #999999;
        font-size: 16px;
        font-weight: 400;
    }
    .temp-2 {
        width: 400px;
    }
    .image {
        width: 100px;
        height: 100px;
        background-color: red;
    }
    .info {
        width: 280px;
        height: 62px;
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .goods-title {
        width: 270px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #666666;
    }
    .type-line {
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid #f5f5f5;
    }
    .type-desc {
        font-size: 14px;
        color: #999999;
    }
    .type-icon {
        font-size: 12px;
        color: #999999;
        transform: rotate(90deg);
    }
    .temp-3 {
        width: 220px;
    }
    .temp-4 {
        width: 180px;
    }
    .temp-5 {
        width: 140px;
    }
    .unit-price {
        font-size: 14px;
        color: #666666;
    }
    .all-price {
        font-size: 14px;
        color: #cf4444;
    }
    .line {
        width: 1240px;
        height: 120px;
        display: flex;
        flex-direction: row;
    }
    .count {
        width: 120px;
        height: 30px;
        display: flex;
        flex-direction: row;
        border: 1px solid #e4e4e4;
        box-sizing: border-box;
    }
    .count_btn {
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #f8f8f8;
    }
    .count_input {
        width: 60px;
        height: 30px;
        color: #666666;
    }
    .operate-1 {
        font-size: 14px;
        color: #666666;
        line-height: 24px;
        cursor: pointer;
    }
    .operate-2 {
        font-size: 14px;
        color: #27ba9b;;
        line-height: 24px;
        cursor: pointer;
    }
    .fcc {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ac {
        display: flex;
        align-items: center;
    }
    .jc {
       display: flex; 
       flex-direction: column;
       align-items: center;
       justify-content: center;
    }
    .bor-b {
        border-bottom: 1px solid #f5f5f5;
    }
    .bor-r {
        border-right: 1px solid #e4e4e4;
    }
    .bor-l {
        border-left: 1px solid #e4e4e4;
    }
</style>