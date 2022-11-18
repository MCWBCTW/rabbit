import { createApp } from 'vue'
import router from "./router/index"
import './style.css'
// 引入阿里云字体图标css
import './assets/iconfont/iconfont.css';
import './assets/iconfont/iconfont.js';

import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');