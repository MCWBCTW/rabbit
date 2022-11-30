import axios from 'axios'

// 获取首页顶部相关数据
export function getIndexData(){
    return axios({
        url:'https://apipc-xiaotuxian-front.itheima.net/home/category/head',
        method:'get'
    })
}

export function getIndexBanner(){
    return axios({
        url:'https://apipc-xiaotuxian-front.itheima.net/home/banner',
        method:'get'
    })
}