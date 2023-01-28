<template>
    <div class="login">
        <div class="head">
            <img class="headImage" src="/images/index_logo.png">
            <div class="titlebox">
                <span class="title">欢迎登录</span>
                <div class="subtitle">
                    <span>进入网站首页</span>
                    <span class="toR iconfont icon-xiangyoujiantou"></span>
                    <span class="toR iconfont icon-xiangyoujiantou"></span>
                </div>
            </div>
        </div>
        <div class="bg-box">
            <img class="bg-image" src="/images/login/login-bg.png">
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
                        <div class="checkbox">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { reactive, ref, Ref } from "@vue/reactivity";

    // 限制表单数据内容
    interface IformBase {
        user: string;
        password: string;
        agree: boolean;
    }

    let form: IformBase = reactive({
        user: '',
        password: '',
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
</script>


<style scoped>
    .login {
        width: 100%;
        display: flex;
        flex-direction: column;
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
    }
    .toR {
        font-size: 14px;
        color: #27ba9b;
    }
    .bg-box {
        width: 100%;
        height: 488px;
        position: relative;
    }
    .bg-image {
        width: 100%;
        height: 488px;
    }
    .login-box {
        width: 380px;
        height: 400px;
        background-color: #ffffff;
        position: absolute;
        bottom: 34px;
        right: 25%;
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
        align-items: center;
        justify-content: space-between;
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
    }
    .marT-30 {
        margin-top: 30px;
    }
</style>