import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'
import store from '@/store'

// import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  const userToken = Cookie.get('userinfo')
  if(!userToken && to.path !== '/login' ){
    next('/login')
  }
  else if(userToken && to.path === '/login'){
    next('/home')
  }
  else{
    next()
  }
})

//每次刷新，Vue实例初始化
//render函数用于生成虚拟DOM，而h函数（createElement）是用于创建虚拟DOM元素的函数
new Vue({
  store,
  router:router,
  render: h => h(App),
  //因为是根据menu配置的是动态路由，所以页面刷新需要重新
  created(){
    store.commit('setMenu',JSON.parse(Cookie.get('menu')))
    store.commit('setRouter',router)
    store.commit('setPageName',JSON.parse(Cookie.get('pageName')))
  }
}).$mount('#app')
