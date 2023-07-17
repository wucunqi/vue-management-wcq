import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:Main,
        name:'MyMain',
        redirect:'/home',
        children:[
        ]
    },
    {
        path:'/login',
        component:Login
    }
]
const router = new VueRouter({
    routes:routes
})

export default router