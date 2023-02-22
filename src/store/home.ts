import { defineStore } from 'pinia'
import { getIndexData } from '../api/api-rabbit';


// 横栏项数据接口
interface IcrossBase {
    data: Array<Icross>
}

// 横栏项
interface Icross {
    title: string;
    id: number;
}
// 横栏项内容
let crossBarArray:IcrossBase = reactive({data: []});

// 声明菜单栏内容接口
interface Imenu {
    title: string;
    subtitle_1: string;
    subtitle_2: string;
}
interface IMenuBase {
    data: Array<Imenu>
}
// 菜单栏内容
let menuArray:IMenuBase = reactive({data: []})

// 声明横栏弹出框数据接口
interface Ibars {
    image: string;
    title: string;
}
interface IBarsBase {
    data: Array<Array<Ibars>>
}
let barsImageArray:IBarsBase = reactive({data: []})

interface ImenuGoodsBase {
    data: Array<Array<ImenuGoods>>
}
interface ImenuGoods {
    image: string;
    title: string;
    desc: string;
    price: string;
}
// 菜单栏右侧弹窗商品数据内容
let menuGoodsArray: ImenuGoodsBase = reactive({data: []});

getIndexData().then(res => {
    // 声明商品数据
    res.data.result.forEach((item: any) => {
        // 声明横栏项数据模板
        let crossObj: Icross = {
            title: item.name,
            id: item.id,
        }
        // 向横栏项中添加数据
        crossBarArray.data.push(crossObj);
        
        // 声明菜单栏内容数据模板
        let menuObj: Imenu = {
            title: item.name,
            subtitle_1: '',
            subtitle_2: '',
        }
        // 声明横栏弹出框数据列表数组，用以储存同组弹出框数据
        let barsImageList: Array<Ibars> = [];
        item.children.forEach((temp: any, Cindex:number) => {
            switch(Cindex){
                case 0 : menuObj.subtitle_1 = temp.name;break;
                case 1 : menuObj.subtitle_2 = temp.name;break;
            }
            // 声明横栏弹出框数据模板
            let barsImageObj: Ibars = {
                title: temp.name,
                image: temp.picture
            }
            barsImageList.push(barsImageObj)
        })
        menuArray.data.push(menuObj)
        barsImageArray.data.push(barsImageList)

        
        let goodsArray: Array<ImenuGoods> = [];
        item.goods.forEach((temp: any) => {
            let good: ImenuGoods = {
                image: temp.picture,
                title: temp.name,
                desc: temp.desc,
                price: temp.price,
            }
            goodsArray.push(good)
        })
        menuGoodsArray.data.push(goodsArray)
    });
    menuArray.data.push({
        title: '品牌',
        subtitle_1: '品牌推荐',
        subtitle_2: '',
    })
})


// 第一个参数是应用程序中 store 的唯一 id
export const HomeStore = defineStore('home', {
    state: () => {
        return {
            CrossBarArray: crossBarArray,
            MenuArray: menuArray,
            BarsImageArray: barsImageArray,
            MenuGoodsArray: menuGoodsArray,
        }
    },
    actions: {
        // 获取首页顶部基本数据，包括横栏内容、横栏弹出框数据、banner上层商品类目以及商品数据
        getIndexTopBaseData() {
            
        },
    },
})