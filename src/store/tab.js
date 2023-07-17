import Cookie from 'js-cookie'
export default{
    //store中的数据存于浏览器的内存中，刷新后不存在
    state:{
        isCollapse:false,
        pageName:'首页',
        tabsList:[],
        menu:[],
        router:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        setMenu(state,val){
            state.menu = val;
            Cookie.set('menu',JSON.stringify(val))
        },
        setPageName(state,val){
            state.pageName = val
            Cookie.set('pageName',JSON.stringify(val))
        },
        setRouter(state,router){
            if(!Cookie.get('menu'))
                return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu;
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item =>{
                        item.component = ()=>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                else{
                    item.component = ()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item =>{
                router.addRoute('MyMain',item)
            })
        }
    }
}