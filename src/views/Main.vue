<template>
    <div>
        <el-container>
            <el-aside width="auto"><Common-aside></Common-aside></el-aside>
            <el-container>
                <el-header>
                    <CommonHeader></CommonHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>  
    </div>
</template>

<script>
    import CommonAside from '@/components/CommonAside.vue'
    import CommonHeader from '@/components/CommonHeader.vue'
    export default{
        name:'MyMain',
        components:{
            CommonAside,
            CommonHeader
        },
    }
</script>

<style scoped>
    .el-header{
        padding:0
    }
</style>