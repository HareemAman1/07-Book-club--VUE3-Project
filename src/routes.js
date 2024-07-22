// 51: ** HOME COMPONENT & ROUTING SETUP **
import AppHome from './components/AppHome.vue'
import AppSignup from './components/AppSignup.vue'
import AppLogin from './components/AppLogin.vue'
import AppAdd from './components/AppAdd.vue'
import AppUpdate from './components/AppUpdate.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes =[
    {
        name:'AppHome',
        component:AppHome,
        path: '/'
    },
    {
        name:'AppSignup',
        component:AppSignup,
        path: '/signup',
        meta: { requiresAuth: true },
    },

    // ** 53: LOGIN PAGE ** 
    {
        name:'AppLogin',
        component:AppLogin,
        path: '/login',
        meta: { requiresAuth: false },
    },

    // ** 57: ADD AND UPDATE PAGE **
    {
        name:'AppAdd',
        component:AppAdd,
        path: '/add'
    },
    {
        name:'AppUpdate',
        component:AppUpdate,
        path: '/update/:id'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router