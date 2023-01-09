<template>
    <div class="info">
        <div class="top">
            <div class="box-1">
                <span class="title">客户服务</span>
                <div class="level">
                    <div class="box">
                        <span class="iconfont icon-kefu iconlogo"></span>
                        <span class="subtitle">在线客服</span>
                    </div>
                    <div class="box">
                        <span class="iconfont icon-gerenzhongxin-wentifankui iconlogo"></span>
                        <span class="subtitle">问题反馈</span>
                    </div>
                </div>
            </div>
            <div class="box-2">
                <span class="title">关注我们</span>
                <div class="level">
                    <div class="box">
                        <span class="iconfont icon-WeChat iconlogo"></span>
                        <span class="subtitle">公众号</span>
                    </div>
                    <div class="box">
                        <span class="iconfont icon-xinlangweibo iconlogo"></span>
                        <span class="subtitle">微博</span>
                    </div>
                </div>
            </div>
            <div class="box-3">
                <span class="title">下载APP</span>
                <div class="level2">
                    <div class="box">
                        <img src="src/assets/images/home/QRcode.jpg">
                    </div>
                    <div class="box2">
                        <span class="desc">扫描二维码</span>
                        <span class="desc">立马下载APP</span>
                        <div class="btn">
                            下载页面
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .top {
        width: 1240px;
        height: 290px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .bottom {
        width: 100%;
        height: 348px;
        display: flex;
        flex-direction: column;
        background-color: #333333;
    }
    .box-1 {
        width: 196px;
        height: 190px;
        padding-right: 72px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-right: 1px solid #f2f2f2;
    }
    .box-2 {
        width: 196px;
        height: 190px;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .box-2 {
        width: 196px;
        height: 190px;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .box-3 {
        width: 210px;
        height: 190px;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .title {
        font-size: 18px;
        color: #999999;
    }
    .level {
        width: 196px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .level2 {
        width: 210px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .box {
        width: 92px;
        height: 92px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #ededed;
    }
    .box img {
        width: 76px;
        height: 76px;
    }
    .box2 {
        width: 106px;
        height: 92px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .iconlogo {
        font-size: 36px;
        color: #666666;
    }
    .subtitle {
        font-size: 14px;
        color: #999999;
        margin-top: 4px;
    }
    .desc {
        font-size: 14px;
        color: #999999;
    }
    .btn {
        width: 106px;
        height: 34px;
        margin-top: 5px;
        color: #ffffff;
        border-radius: 2px;
        background-color: #27ba9b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
</style>