<template>
    <div class = "header-container">
        <div class = 'l-content'>
            <el-button icon="el-icon-menu" size="mini" v-on:click="handerMenu"></el-button>
            <span class = 'text'>{{ pageName }}</span>
        </div>
        <div class = 'r-content'>
            <el-dropdown v-on:command="handleClick">
                <span class="el-dropdown-link">
                    <img class = "user" src="../assets/images/admin1.jpg" alt="头像">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
    export default{
        methods:{
            handerMenu(){
                this.$store.commit('collapseMenu')
            },
            handleClick(command){
                if(command === 'exit'){
                    //logininfo是后端返回的token，判断是否登录成功
                    Cookie.remove('userinfo')
                    Cookie.remove('menu')
                    this.$router.push('/login')
                }
            }
        },
        computed:{
            pageName(){
                return this.$store.state.tab.pageName
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-container{
        background-color: #333;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }
    .text{
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .r-content{
        .user{
            width: 45px;
            height: 45px;
            border-radius: 20%;
        }
    }
</style>