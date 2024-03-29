import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
 
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'), // 建议进行路由懒加载，优化访问性能
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/children/home.vue'),
            },
            {
                path: '/cart',
                name: 'cart',
                component: () => import('../views/children/cart.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    },
]
 
const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHashHistory(),	 // 使用hash模式
  routes
})
 
export default router