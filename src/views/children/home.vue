<template>
    <div class="index">
        <descBars :title="'新鲜好物'" :subtitle="'新鲜出炉 品质靠谱'" :showMore="true"></descBars>
        <div class="level">
            <bigGoods v-for="(item, index) in goodsArray.data" :type="1" :key="index" :goods="item" :infoBG="'#f0f9f4'" :priceColor="'#cf4444'"></bigGoods>
        </div>
        <descBars :title="'人气推荐'" :subtitle="'人气爆款 不容错过'"></descBars>
        <div class="level">
            <bigGoods v-for="(item, index) in hotGoods.data" :type="2" :key="index" :goods="item" :priceColor="'#999999'"></bigGoods>
        </div>
        <div class="greyLine">
            <descBars :title="'热门品牌'" :subtitle="'国际经典 品质保证'">
                <div class="desc-right">
                    <div class="right-btn" :class="hotBrandIndex == 1 ? 'disa' : 'unban'" @click="checkSwiper(0)">
                        <span class="iconfont icon-xiangzuo1 btn-content"></span>
                    </div>
                    <div class="right-btn" :class="hotBrandIndex == 2 ? 'disa' : 'unban'" @click="checkSwiper(1240)">
                        <span class="iconfont icon-xiangyou btn-content"></span>
                    </div>
                </div>
            </descBars>
        </div>
        <div class="greyLine">
            <div class="level">
                <swiper :type="2" :width="1240" :height="345" :imageArray="hotBrandArray.data" :paddingDistance="paddingDistance"></swiper>
            </div>
        </div>
        <div class="level-goods" v-for="(item, index) in goodsList.data" :key="index">
            <descBars :title="item.name" :showMore="true">
                <div class="goodsBars">
                    <span v-for="(temp, o) in item.child" :key="o">{{ temp.name }}</span>
                </div>
            </descBars>
            <homeGoods :goods="item"></homeGoods>
        </div>
        <div class="greyLine padB-30">
            <div class="level">
                <descBars :title="'最新专题'" :showMore="true"></descBars>
            </div>
            <div class="level">
                <homeSpecial v-for="(item, o) in specialArray.data" :key="o" :special="item"></homeSpecial>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { getGoodGoods, getHotGoods, getHotBrandData, getIndexGoods, getIndexSpecial } from '../../api/api-rabbit';
    import type { Ref } from 'vue'

    // 获取首页好物
    getGood();
    // 获取专题
    getNewSpecial();
    // 获取人气推荐
    getHot();
    // 获取热门品牌
	getHotBrand();
    // 获取商品
    getGoods();


    interface IGoodsInfo {
        name: string;
        desc: string;
        image: string;
        price: string;
    }
    interface IbarsInfo {
        name: string;
    }
    interface IGoodArray {
        name: string;
        image: string;
        info: string;
        goods: Array<IGoodsInfo>;
        child: Array<IbarsInfo>
    }
    interface IGoodsListBase {
        data: Array<IGoodArray>
    }
    let goodsList: IGoodsListBase = reactive({data: []});
    // 获取首页商品
    function getGoods(){
        getIndexGoods().then(res => {
            res.data.result.forEach((item: any) => {
                let goodsObj: IGoodArray = {
                    name: item.name,
                    info: item.saleInfo,
                    image: item.picture,
                    goods: [],
                    child: []
                };
                item.children.forEach((temp: any) => {
                    let childObj: IbarsInfo = {
                        name: temp.name
                    }
                    goodsObj.child.push(childObj);
                })
                item.goods.forEach((temp: any) => {
                    let goodObj: IGoodsInfo = {
                        name: temp.name,
                        desc: temp.desc,
                        image: temp.picture,
                        price: temp.price,
                    }
                    goodsObj.goods.push(goodObj);
                })
                goodsList.data.push(goodsObj)
            })
        })
    }




    // 热门品牌
	let hotBrandIndex: Ref<Number> = ref(1);
	
	interface IhotBrand {
		place: string;
		image: string;
		name: string;
	}
	interface IhotBrandBase {
		data: Array<IhotBrand>
	}
	let hotBrandArray: IhotBrandBase = reactive({data: []});
	
	// swiper type为2时，右侧的距离值
	let paddingDistance: Ref<Number> = ref(0)
	
	// 修改type为2的swiper时，右侧的距离值
	function checkSwiper(num: number){
        // return 的情况，则是禁用状态
		if(num == 0 && hotBrandIndex.value == 1){
			return
		}
		if(num == 1240 && hotBrandIndex.value == 2){
			return
		}
		hotBrandIndex.value = hotBrandIndex.value == 1 ? 2 : 1;
		paddingDistance.value = num;
	}

	// 获取热门品牌数据
	function getHotBrand(){
		getHotBrandData().then(res => {
			res.data.result.forEach((item: any) => {
                let brand: IhotBrand = {
                    place: item.place,
                    image: item.picture,
                    name: item.name,
                }
				hotBrandArray.data.push(brand)
			})
		})
	}

    interface Ihot {
        title: string;
        image: string;
        desc: string;
    }
    interface IhotBase {
        data: Array<Ihot>
    }
    // 人气推荐数据
    let hotGoods: IhotBase = reactive({data: []})

    // 获取人气推荐
    function getHot(){
        getHotGoods().then(res => {
            res.data.result.forEach((item: any) => {
                let hot: Ihot = {
                    title: item.title,
                    image: item.picture,
                    desc: item.alt,
                }
                hotGoods.data.push(hot)
            })
        })
    }
    interface Igoods {
        desc: string;
        image: string;
        price: string;
    }
    interface IgoodsBase {
        data: Array<Igoods>
    }
    // 好物数据
    let goodsArray: IgoodsBase = reactive({data: []})

    // 获取新鲜好物
    function getGood(){
        getGoodGoods().then(res => {
            res.data.result.forEach((item: any) => {
                let goods: Igoods = {
                    desc: item.name,
                    image: item.picture,
                    price: item.price,
                }
                goodsArray.data.push(goods)
            })
        })
    }

    // 首页专题详细数据模板
    interface ISpecial {
        collect: number; // 收藏数量
        view: number; // 在看数量
        reply: number; // 评论数量
        image: string;
        desc: string;
        title: string;
        price: number;
    }
    // 专题数据模板
    interface ISpecialBase {
        data: Array<ISpecial>
    }
    let specialArray: ISpecialBase = reactive({data: []})
    // 获取最新专题
    function getNewSpecial(){
        getIndexSpecial().then(res => {
            res.data.result.forEach((item: any) => {
                let specialObj: ISpecial = {
                    collect: item.collectNum,
                    view: item.viewNum,
                    reply: item.replyNum,
                    image: item.cover,
                    desc: item.summary,
                    title: item.title,
                    price: item.lowestPrice,
                }
                specialArray.data.push(specialObj)
            })
        })
    }
</script>


<style scoped>
    .index {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
    }
    .greyLine {
        width: 100%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .level {
        width: 1240px;
        display: flex;
        padding: 0;
        margin: 0;
        flex-direction: row;
        justify-content: space-between;
    }
    .desc-right {
        display: flex;
        align-items: flex-end;
        cursor: pointer;
        color: #999999;
    }
    .right-btn {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}
	.right-btn span {
		font-size: 16px;
		color: #ffffff;
	}
    .btn-content {
		font-size: 12px;
	}
    .level-goods {
        width: 1240px;
        display: flex;
        padding: 0;
        margin: 0;
        flex-direction: column;
    }
    .goodsBars {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding-right: 80px;
    }
    .goodsBars span {
        padding: 2px 12px;
        font-size: 16px;
        border-radius: 4px;
        color: #333333;
    }
    .goodsBars span:hover {
        background-color: #27ba9b;
        color: #ffffff;
    }
    .disa {
        background-color: #cccccc;
        cursor: no-drop;
    }
    .unban {
        background-color: #27ba9b;
        cursor: pointer;
    }
    .padB-30 {
        padding-bottom: 30px;
    }
</style>