import Mock from 'mockjs'
export default{
    getMenu:loginInfo =>{
        const{username,password} = JSON.parse(loginInfo.body)
        if(username === 'admin' && password == '123'){
            return{
                code:200,
                menu:[
                    {
                        path:'/home',
                        label:'首页',
                        icon:'s-home',
                        url:'MyHome.vue'
                    },
                    {
                        path:'/user',
                        label:'用户管理',
                        icon:'video-play',
                        url:'UserDetail.vue',
                    },
                    {
                        path:'/mall',
                        label:'商品管理',
                        icon:'video-play',
                        url:'MallManagement.vue'
                    },
                    {
                        label:'其他',
                        icon:'location',
                        children:[
                            {
                                path:'/page1',
                                label:'页面1',
                                icon:'setting',
                                url:'PageOne',
                            },
                            {
                                path:'/page2',
                                label:'页面2',
                                icon:'setting',
                                url:'PageTwo',
                            }
                        ]
                    }
                ],
                token: Mock.Random.guid(),
                message:'获取成功'
            }
        }
        else if(username === 'wcq' && password == '123'){
            return{
                code:200,
                //动态添加注册路由
                menu:[
                    {
                        path:'/home',
                        label:'首页',
                        icon:'s-home',
                        url:'MyHome.vue'
                    },
                    {
                        path:'/mall',
                        label:'商品管理',
                        icon:'video-play',
                        url:'MallManagement.vue'
                    },
                ],
                token: Mock.Random.guid(),
                message:'获取成功'
            }
        }
        else{
            return{
                code:201,
                message:'用户名或密码错误'
            }    
        }
    }
}