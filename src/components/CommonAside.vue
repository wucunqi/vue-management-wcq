<template>
    <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#ffffff"
    active-text-color="#ffffff">
        <h3>{{ isCollapse ? '后台':'后台管理' }}</h3>

        <el-menu-item v-for="item in noChildren" v-bind:key="item.label" v-bind:index="item.name" v-on:click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" v-bind:key="item.label" v-bind:index = "item.label">
            <template slot="title">
                <!-- 编程：class用于动态绑定属性，:index用于动态绑定属性 -->
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" v-bind:key="subItem.label">
                <el-menu-item :index="subItem.name" v-on:click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group> 
        </el-submenu>
        
    </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
  export default {
    data(){
        return{
        }
    },
    methods:{
        clickMenu(item){
            if(this.$route.path !== item.path){
                this.$store.commit('setPageName',item.label)
                this.$router.push(item.path)
            }
        }
    },
    computed:{
        noChildren(){
            return this.menu.filter(item=>!item.children)
        },
        hasChildren(){
            return this.menu.filter(item=>item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        //因为store中的数据刷新后会消失，故需要使用cookie缓存
        menu(){
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
  .el-menu-vertical-demo{
    min-height: 100vh;
  }
  .el-menu{
    height: 100%;
    border-right: none;
    h3{
        color:white;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
  }
</style>


