<template>
        <div class = "login-container">
            <h3 class="login-title">标本文物后台管理系统</h3>
            <el-form ref = "form" v-bind:model="form" :rules="rules" :inline="false" label-width="70px">
                <el-form-item prop="accountname" label="账号">
                    <el-input v-model="form.accountname" placeholder="手机号/用户名"></el-input> 
                </el-form-item>
                <el-form-item prop="password" label="密码" >
                    <!-- 如何实现回车自动登录 -->
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" v-on:keyup.enter = "submit"></el-input> 
                </el-form-item>
                <el-form-item >
                    <el-button v-on:click="submit" type = "primary">登录</el-button>
                    <el-button v-on:click="register" >注册</el-button> 
                    <el-button v-on:click="surf">浏览</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>

<script>
import Cookie from 'js-cookie'
// 只会导入api/index模块中的getMenu函数，即解构出来
import {getMenu} from '../api/index'
    export default{
        name:'LoginPage',
        data(){
            return{
                form:{
                    accountname:'',
                    password:''
                },
                rules:{
                    accountname:[
                        // trigger表示失去焦点触发
                        {required:'true',message:'请输入用户名',trigger:'blur'}
                    ],
                    password:[
                        {required:'true',message:'请输入用户名',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            submit(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        getMenu(this.form).then(( loginBack )=>{
                            if(loginBack.data.code === 200){
                                Cookie.set('userinfo',loginBack.data.token)
                                this.$store.commit('setMenu',loginBack.data.menu)
                                this.$store.commit('setRouter',this.$router)
                                this.$router.push('/')
                            }
                            else{
                                this.$message.error(loginBack.data.message);
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container{
        width:25%;
        margin:180px auto;
        border-radius: 10%;
        // box-sizing属性有两个值：content-box和border-box。
        .login-title{
            text-align: center;
            color: #505458;
            margin-bottom: 20px;
        }
    }
    el-input{
        width: 160px;
    }
</style>