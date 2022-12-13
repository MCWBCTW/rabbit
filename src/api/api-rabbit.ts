import axios from 'axios'

// 获取首页顶部相关数据
export function getIndexData(){
    return axios({
        url: 'https://apipc-xiaotuxian-front.itheima.net/home/category/head',
        method: 'get'
    })
}

// 获取首页banner图片
export function getIndexBanner(){
    return axios({
        url: 'https://apipc-xiaotuxian-front.itheima.net/home/banner',
        method: 'get'
    })
}

// 获取首页品牌内容
export function getBrandData(){
    return axios({
        url: 'https://apipc-xiaotuxian-front.itheima.net/home/brand?limit=6',
        method: 'get'
    })
}

// 获取首页新鲜好物
export function getGoodGoods(){
    return axios({
        url: 'https://apipc-xiaotuxian-front.itheima.net/home/new',
        method: 'get'
    })
}

// 获取首页人气推荐
export function getHotGoods(){
    return axios({
        url: 'https://apipc-xiaotuxian-front.itheima.net/home/hot',
        method: 'get'
    })
}