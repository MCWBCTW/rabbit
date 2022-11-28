import axios from 'axios'

//获取验证码图片信息
export function getIndexData(){
    return axios({
        url:'https://apipc-xiaotuxian-front.itheima.net/home/category/head',
        method:'get'
    })
}