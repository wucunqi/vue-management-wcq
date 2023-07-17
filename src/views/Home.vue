<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class = "user">
                        <img src="../assets/images/admin1.jpg" alt="">
                        <div class = "userinfo">
                            <p class = "access">管理员</p>
                            <p clsss = "name">吴存其</P> 
                        </div>
                    </div>
                    <div class = "login-info">
                        <p>上次登录时间:<span>2023-6-11</span></p>
                        <p>上次登录地点:<span>北京</span></p>
                    </div>
                </el-card>
                <el-card class = "box-card" style="margin-top: 20px;">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <!-- 使用对象的键作为key属性的值。这将确保每个元素都有一个唯一的key属性 -->
                        <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" :key="key"/>
                        <!-- <el-table-column
                            prop="date"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column> -->
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="16" style="padding-left: 10px;">
                <div class = "num">
                    <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}" >
                        <i class = "icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                        <div class = "detail">
                            <p class = "price">￥{{ item.value }}</p>
                            <p class = "desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height:280px">
                    <div ref="echarts1" style="height:280px"></div>
                </el-card>
                <div class = "graph">
                    <el-card style="height:260px"></el-card>
                    <el-card style="height:260px"></el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import {getData} from '../api'
// import * as echarts from 'echarts'
    export default{
        name:'HomePage',
        data(){
            return{
                tableLabel:{
                    date:'日期',
                    name:'姓名',
                    address:'地址'
                },
                tableData:[
                    //数据改为后端mock模拟的数据，不写死
                    // {
                    //     date:'2023-06-11',
                    //     name:'王小虎',
                    //     address:'上海市普陀区'
                    // },{
                    //     date:'2023-06-11',
                    //     name:'王小虎',
                    //     address:'上海市普陀区'
                    // },{
                    //     date:'2023-06-11',
                    //     name:'王小虎',
                    //     address:'上海市普陀区'
                    // },{
                    //     date:'2023-06-11',
                    //     name:'王小虎',
                    //     address:'上海市普陀区'
                    // },
                ],
                countData:[
                    {
                        name:'今日支付订单',
                        value:1234,
                        icon:'success',
                        color:'#2ec7c9'
                    },
                    {
                        name:'今日收藏订单',
                        value:500,
                        icon:"star-on",
                        color:'#ffb980'
                    },
                    {
                        name:'今日未支付订单',
                        value:1234,
                        icon:'s-goods',
                        color:'#5ab1ef',
                    },
                    {
                        name:'本月支付订单',
                        value:2394,
                        icon:'success',
                        color:'#2ec7c9',
                    },
                    {
                        name:'本月收藏订单',
                        value:48725,
                        icon:'star-on',
                        color:'#ffb980'
                    },
                    {
                        name:'本月未支付订单',
                        value:8423,
                        icon:'s-goods',
                        color:'#5ab1ef'
                    }
                ]
            }
        },
        mounted(){
            // getData().then((result)=>{
            //     this.tableData = result.data.tableData

            //     //ES6语法---解构，减少临时引用
            //     const {orderData} = result.data
            //     const myChart1 = echarts.init(this.$refs.echarts1)
            //     // ES6语法
            //     const series = orderData.map((item)=>({
            //         name:item[0].name,
            //         type:'line',
            //         data:item.map(subItem=>subItem.price)
            //     }))
                
            //     var option1 = {
            //         title:{
            //             text:'水果'
            //         },
            //         //ES引入的语法，将对象转换为数组
            //         xAxis:{
            //             //横坐标是类目
            //             type:'category',
            //             name:'日期',
            //             data:orderData[0].map(item => item.date)
            //         },
            //         //注意这里y轴没有数据值，数据值在series中
            //         yAxis: {
            //             //纵坐标数值型
            //             type: 'value',
            //             name:'单价',
            //             formatter: '{value} 元',
            //         },
            //         legend: {
            //             orient: 'horizontal',
            //             right: 10,
            //             top: 'top',
            //         },
            //         series:series, 
            //     }
            //     myChart1.setOption(option1)
            // })
        }
    }
</script>

<style lang="less" scoped>
    .user{
        padding-bottom:20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        img{
            margin-right: 40px;
            width: 150px;
            height: 150px;
            border-radius: 20%;
        }
        .userinfo{
            .access{
                font-size: 32px;
                margin-bottom: 10px;
            }
        }
    }
    .login-info{
            p{
                line-height: 28px;
                font-size: 14px;
                color: #999999;
                span{
                    color:#666666;
                    margin-left: 60px;
                }
            }
    }
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card{
            width: 32%;
            margin-bottom: 20px;
            border: 0;
        }
        .icon{
            width:80px;
            height: 80px;
            font-size:30px;
            text-align: center;
            line-height: 80px;
            color:#fff
        }
        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .price{
                font-size: 30px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;
            }
            .desc{
                font-size: 14px;
                text-align: center;
                color: #999999;
            }
        }
    }
    .graph{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
        }
    }
</style>