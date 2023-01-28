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
            <div class="box-4">
                <span class="title">服务热线</span>
                <div class="vertical">
                    <span class="phone">187-8101-0339</span>
                    <span class="time">周一至周日9:00-18:00</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="slogan">
                <div class="sloganbox">
                    <span class="iconfont icon-hezi logo"></span>
                    <span class="slogandesc">价格亲民</span>
                </div>
                <div class="sloganbox">
                    <span class="iconfont icon-24gl-thumbsUp2 logo2"></span>
                    <span class="slogandesc">物流快捷</span>
                </div>
                <div class="sloganbox">
                    <span class="iconfont icon-jiaotonggongju_jiaotonggongju-huoche-21 logo2"></span>
                    <span class="slogandesc">品质新鲜</span>
                </div>
            </div>
            <div class="copyright">
                <div class="level3">
                    <div class="copyright-text b-r">关于我们</div>
                    <div class="copyright-text b-r">帮助中心</div>
                    <div class="copyright-text b-r">售后服务</div>
                    <div class="copyright-text b-r">配送与验收</div>
                    <div class="copyright-text b-r">商务合作</div>
                    <div class="copyright-text b-r">搜索推荐</div>
                    <div class="copyright-text">友情链接</div>
                </div>
                <div class="level3 m-t">
                    <div class="copyright-text">CopyRight © lzx</div>
                </div>
            </div>
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
        align-items: center;
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
    .box-4 {
        width: 196px;
        height: 190px;
        padding-left: 72px;
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
    .vertical {
        width: 196px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .time {
        font-size: 15px;
        color: #999;
    }
    .phone {
        font-size: 22px;
        color: #666;
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
    .box:hover .iconfont{
        color: #27ba9b;
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
        cursor: pointer;
    }
    .slogan {
        width: 1240px;
        height: 178px;
        border-bottom: 1px solid #434343;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .sloganbox {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .logo {
        font-size: 50px;
        color: #333333;
        background-color: #ffffff;
        border-radius: 100px;
    }
    .logo2 {
        font-size: 30px;
        font-weight: bold;
        padding: 8px;
        color: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 100px;
    }
    .slogandesc {
        font-size: 28px;
        color: #ffffff;
        margin-left: 10px;
    }
    .copyright {
        width: 1240px;
        height: 170px;
        padding-top: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .level3 {
        width: 1240px;
        display: flex;
        justify-content: center;
    }
    .copyright-text {
        font-size: 15px;
        color: #999999;
        padding: 0 10px;
        cursor: pointer;
    }
    .b-r {
        border-right: 1px solid #999999;
    }
    .m-t {
        margin-top: 20px;
    }
</style>