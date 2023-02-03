<template>
    <div class="login">
        <div class="head">
            <img class="headImage" src="/images/index_logo.png">
            <div class="titlebox">
                <span class="title">欢迎登录</span>
                <div class="subtitle" @click="goHome">
                    <span>进入网站首页</span>
                    <span class="toR iconfont icon-xiangyoujiantou"></span>
                    <span class="toR iconfont icon-xiangyoujiantou"></span>
                </div>
            </div>
        </div>
        <div class="bg-box">
            <!-- <img class="bg-image" src="/images/login/login-bg.png"> -->
            <div class="login-box">
                <span class="login-title">账户登录</span>
                <div class="form marT-30">
                    <div class="inputbox" :style="{border: `1px solid ${userFocusFlag ? '#27ba9b' : '#cfcdcd'}`}">
                        <div class="logo-box">
                            <span class="logo iconfont icon-jurassic_user"></span>
                        </div>
                        <input type="text" v-model="form.user" @focus="userInputFocus" @blur="userInputBlur">
                    </div>
                    <div class="inputbox" :style="{border: `1px solid ${passFocusFlag ? '#27ba9b' : '#cfcdcd'}`}">
                        <div class="logo-box">
                            <span class="logo iconfont icon-24gl-lock"></span>
                        </div>
                        <input type="password" v-model="form.password" @focus="passInputFocus" @blur="passInputBlur">
                    </div>
                    <div class="clause">
                        <div class="checkbox" :style="{border: `${form.agree ? '1px solid #27ba9b' : '1px solid #333333'}`}" @click="check">
                            <span v-if="form.agree">√</span>
                        </div>
                        <span>我已同意</span>
                        <span class="link">《隐私条款》</span>
                        <span>和</span>
                        <span class="link">《服务条款》</span>
                    </div>
                    <div class="warn" v-if="!form.agree">
                        <div class="warnbox">
                            <span>!</span>
                        </div>
                        <span class="warntext">请勾选登录协议</span>
                    </div>
                    <div class="btn" @click="login">
                        <span>登录</span>
                    </div>
                </div>
                <div class="line">
                    <span>忘记密码</span>
                    <span>免费注册</span>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="info-line cur">
                <span>关于我们</span>
                <p>|</p>
                <span>帮助中心</span>
                <p>|</p>
                <span>售后服务</span>
                <p>|</p>
                <span>配送与验收</span>
                <p>|</p>
                <span>商务合作</span>
                <p>|</p>
                <span>搜索推荐</span>
                <p>|</p>
                <span>友情链接</span>
            </div>
            <div class="info-line">
                <span>CopyRight © lzx</span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { useRouter } from "vue-router"
    import type { Ref } from 'vue'

    import { encryptionObj } from '../utils/tools'

    const router = useRouter()
    // 限制表单数据内容
    interface IformBase {
        user: string;
        password: string;
        agree: boolean;
    }

    let form: IformBase = reactive({
        user: 'copyxtxr001',
        password: 'Aa123456',
        agree: true
    });

    // 用户输入框聚焦状态
    let userFocusFlag: Ref<boolean> = ref(false);

    function userInputFocus(){
        userFocusFlag.value = true;
    }
    function userInputBlur(){
        userFocusFlag.value = false;
    }

    // 密码输入框聚焦状态
    let passFocusFlag: Ref<boolean> = ref(false);

    function passInputFocus(){
        passFocusFlag.value = true;
    }
    function passInputBlur(){
        passFocusFlag.value = false;
    }

    // 修改同意状态
    function check(){
        form.agree = !form.agree;
    }

    // 前往首页
    function goHome(){
        router.push({ path:'/'})
    }

    // 登录
    function login(){
        if(form.agree){
            router.push({ path:'/', query: encryptionObj({user: form.user, password: form.password})})
        }
    }
</script>


<style scoped>
    .login {
        width: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
    }
    .head {
        width: 1240px;
        height: 132px;
        margin: 0 auto;
        display: flex;
    }
    .headImage {
        width: 200px;
        height: 132px;
        cursor: pointer;
    }
    .titlebox {
        display: flex;
        align-items: flex-end;
        flex-direction: row;
        padding-bottom: 38px;
        justify-content: space-between;
        height: 132px;
        width: 100%;
        box-sizing: border-box;
    }
    .title {
        font-size: 24px;
        font-weight: 400;
        margin-left: 20px;
        color: #666;
    }
    .subtitle {
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .toR {
        font-size: 14px;
        color: #27ba9b;
    }
    .bg-box {
        width: 100%;
        height: 488px;
        min-width: 1240px;
        position: relative;
        background: url(/images/login/login-bg.png) no-repeat 50%/cover;
    }
    .bg-image {
        height: 488px;
    }
    .login-box {
        width: 380px;
        height: 400px;
        background-color: #ffffff;
        position: absolute;
        bottom: 34px;
        left: 50%;
        transform: translate3d(100px,0,0);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .login-title {
        color: #27ba9b;
        font-weight: 700;
        font-size: 18px;
        margin: 20px auto;
    }
    .form {
        width: 380px;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 40px;
        box-sizing: border-box;
    }
    .inputbox {
        width: 300px;
        height: 36px;
        display: flex;
        box-sizing: border-box;
    }
    .logo-box {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #cfcdcd;
    }
    .logo {
        color: #ffffff;
    }
    .inputbox input {
        width: 266px;
        height: 34px;
        box-sizing: border-box;
        border: none;
        outline: none;
        text-indent: 4px;
    }
    .clause {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .checkbox {
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #27ba9b;
        cursor: pointer;
        margin-right: 4px;
    }
    .link {
        color: #006699;
        cursor: pointer;
    }
    .btn {
        width: 300px;
        height: 40px;
        background-color: #27ba9b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
    }
    .line {
        width: 380px;
        height: 64px;
        padding: 0 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: end;
        font-size: 14px;
        color: #999999;
    }
    .line span {
        margin-left: 8px;
        cursor: pointer;
    }
    .info {
        width: 100%;
        min-width: 1240px;
        height: 140px;
        padding: 20px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .info-line {
        width: 100%;
        min-width: 1240px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #999999;
    }
    .info-line p {
        margin: 0 8px;
        color: #cccccc;
    }
    .warn {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 134px;
    }
    .warnbox {
        width: 14px;
        height: 14px;
        background-color: #cf4444;
        color: #ffffff;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        margin-right: 4px;
    }
    .warntext {
        color: #cf4444;
        font-size: 12px;
    }
    .cur {
        cursor: pointer;
    }
    .marT-30 {
        margin-top: 30px;
    }
</style>