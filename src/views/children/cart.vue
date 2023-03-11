<template>
    <div class="cart">
        <crumbs :curmbsRouter="curmbsRouter"></crumbs>
        <div class="list">
            <div class="head bor-b">
                <div class="temp temp-1">
                    <div class="checkbox" :class="cartCheckAll ? 'check' : 'uncheck'" @click="checkAll">
                        <span class="hook" v-show="cartCheckAll">√</span>
                    </div>
                    <span class="checkTextStyle" :class="cartCheckAll ? 'checkText' : 'uncheckText'" @click="checkAll">全选</span>
                </div>
                <div class="temp fcc temp-2">
                    <span class="label">商品信息</span>
                </div>
                <div class="temp fcc temp-3">
                    <span class="label">单价</span>
                </div>
                <div class="temp fcc temp-4">
                    <span class="label">数量</span>
                </div>
                <div class="temp fcc temp-4">
                    <span class="label">小计</span>
                </div>
                <div class="temp fcc temp-5">
                    <span class="label">操作</span>
                </div>
            </div>
            <cartGoods v-for="(item, o) in cartGoodsData" v-model:check="cartCheckFlagArray[o]" :key="o"
                :goods="item" v-model:num="item.num" @updataInfo="countCartInfo" @deleteGoods="deleteGoods" @collectGoods="collectGoods"></cartGoods>
        </div>
        <div class="census">
            <div class="census-left">
                <div class="checkbox" :class="cartCheckAll ? 'check' : 'uncheck'" @click="checkAll">
                    <span class="hook" v-show="cartCheckAll">√</span>
                </div>
                <span class="checkTextStyle" :class="cartCheckAll ? 'checkText' : 'uncheckText'" @click="checkAll">全选</span>
                <span class="census-left-btn" @click="deleteGoods()">删除商品</span>
                <span class="census-left-btn" @click="collectGoods()">移入收藏夹</span>
                <span class="census-left-btn" @click="emptyGoods()">清空失效商品</span>
            </div>
            <div class="census-right">
                <span class="census-right-text">共{{ cartGoodsTotalAmount }}件商品，已选择{{ checkGoodsTotalAmount }}件，商品合计：</span>
                <span class="census-right-price">￥{{ checkGoodsTotalPrice }}</span>
                <div class="census-right-btn">
                    <span class="census-right-btn-text">下单结算</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

    import type { Ref } from 'vue'

    // 面包屑 规范接口
    interface Icurmbs {
        title: string;
        router: string;
        jumpFlag: boolean
    }

    // 面包屑 内容配置
    const curmbsRouter: Array<Icurmbs> = [{
        title: '首页',
        router: '/',
        jumpFlag: true
    }, {
        title: '购物车',
        router: '',
        jumpFlag: false
    }]
    
    // 定义商品数据接口
    interface Igoods {
        title: string; // 商品名称
        num: number; // 数量
        unitPrice: number; // 单价
        picture: string; // 图片
        lapse: boolean; // 是否失效
        types: Array<IgoodsTypes>; // 商品的类目
    }
    // 商品类目数据接口
    interface IgoodsTypes {
        type: number; // 选中的类型
        name: string; // 类型名称
        select: Array<Itypes>; // 待选择的类型数据
    }
    // 商品类目待选择数据接口
    interface Itypes {
        type: number;
        desc: string;
        picture: string;
    }
    // 购物车中的商品
    let cartGoodsData: Array<Igoods> = reactive([]);

    // 购物车中商品的勾选状态
    let cartCheckFlagArray: Array<boolean> = reactive([]);
    // 购物车商品是否全部勾选
    let cartCheckAll: Ref<boolean> = ref(false);
    

    // 勾选的商品总数
    let checkGoodsTotalAmount: Ref<number> = ref(0);
    // 购物车勾选商品总价
    let checkGoodsTotalPrice: Ref<number> = ref(0);
    // 购物车商品总数
    let cartGoodsTotalAmount: Ref<number> = ref(0);
    watch(cartCheckFlagArray, (newV) => {
        // 校验购物车中商品是否是全部勾选
        cartCheckAll.value = !newV.includes(false);

        countCartInfo(); // 计算购物车勾选总数
        
    })
    
    // 勾选全部商品
    function checkAll(){
        cartCheckAll.value = !cartCheckAll.value;
        for(let i = 0; i < cartCheckFlagArray.length; i++){
            cartCheckFlagArray[i] = cartCheckAll.value;
        }
    }

    function countCartInfo(){
        let totalAmount = 0; // 勾选商品总数
        let totalPrice = 0; // 勾选商品总价
        let cartTotalAmount = 0; // 购物车商品总数
        
        cartGoodsData.forEach((item, index) => {
            if(cartCheckFlagArray[index]){
                // 当前商品勾选
                totalAmount += item.num;
                totalPrice += Number((item.num * item.unitPrice).toFixed(2))
            }
            cartTotalAmount += item.num;
        })
        checkGoodsTotalAmount.value = totalAmount;
        checkGoodsTotalPrice.value = totalPrice;
        cartGoodsTotalAmount.value = cartTotalAmount;
    }




    getCartGoods();
    
    // 获取购物车的商品
    function getCartGoods(){
        cartGoodsData.push({
            title: '日式和风简约无盖垃圾桶11L',
            num: 1,
            unitPrice: 19.8,
            picture: '',
            lapse: false,
            types: [{
                type: 1,
                name: '颜色',
                select: [{
                    type: 1,
                    desc: '白色',
                    picture: '',
                },{
                    type: 2,
                    desc: '黑色',
                    picture: '',
                }]
            }],
        })
        cartGoodsData.push({
            title: '日式和风简约无盖垃圾桶11L',
            num: 1,
            unitPrice: 19.8,
            picture: '',
            lapse: false,
            types: [{
                type: 1,
                name: '颜色',
                select: [{
                    type: 1,
                    desc: '白色',
                    picture: '',
                },{
                    type: 2,
                    desc: '黑色',
                    picture: '',
                }]
            }],
        })
        cartCheckFlagArray.push(false)
        cartCheckFlagArray.push(false)
    }






    // 删除指定商品
    /**
     * 
     * @param index 存在则为子组件传递而来，仅删除对应下标的商品；反之为本页面删除多个商品按钮
     */
    function deleteGoods(index?:number){
        if(index == undefined){
            // 多个
            let newFlag: Array<boolean> = []; // 新勾选状态数组
            let newGoods: Array<Igoods> = []; // 新购物车数据
            cartCheckFlagArray.forEach((flag, index) => {
                if(!flag){
                    // 当前下标商品未勾选
                    newGoods.push(cartGoodsData[index])
                }
                newFlag.push(false); // 勾选的商品都删除，留下的均未勾选
            })
            cartGoodsData = JSON.parse(JSON.stringify(newGoods));
            cartCheckFlagArray = JSON.parse(JSON.stringify(newFlag));
        } else {
            // 子组件传递，仅删除一个
            cartGoodsData.splice(index, 1);
            cartCheckFlagArray.splice(index, 1);
        }
    }

    // 加入收藏夹，index 同上
    function collectGoods(index?:number){
        if(index == undefined){
            // 多个
        }
    }

    // 清空失效商品，index 同上
    function emptyGoods(index?:number){
        if(index == undefined){
            // 多个
        }
    }
</script>


<style scoped>
    .cart {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
    }
    .list {
        width: 1240px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
    }
    .head {
        width: 1240px;
        height: 70px;
        display: flex;
        flex-direction: row;
    }
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
    .checkTextStyle {
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
    }
    .checkText {
        color: #27ba9b;
    }
    .uncheckText {
        color: #999999;
    }
    .temp-2 {
        width: 400px;
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
    .label {
        font-size: 16px;
        color: #666666;
    }
    .line {
        width: 1240px;
        height: 120px;
        display: flex;
        flex-direction: row;
    }
    .census {
        width: 1240px;
        height: 80px;
        margin-top: 20px;
        padding: 0 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
    }
    .census-left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .census-left-btn {
        cursor: pointer;
        margin-left: 20px;
        color: #333333;
    }
    .census-right {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .census-right-text {
        color: #333333;
    }
    .census-right-price {
        color: #cf4444;
    }
    .census-right-btn {
        width: 180px;
        height: 50px;
        border-radius: 4px;
        background-color: #27ba9b;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        cursor: pointer;
    }
    .census-right-btn-text {
        color: #ffffff;
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
    .bor-b {
        border-bottom: 1px solid #f5f5f5;
    }
</style>